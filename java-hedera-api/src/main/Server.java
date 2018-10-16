package main;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

// The tutorial can be found just here on the SSaurel's Blog :
// https://www.ssaurel.com/blog/create-a-simple-http-web-server-in-java
// Each Client Connection will be managed in a dedicated Thread
public class Server implements Runnable
{

	static final int PORT = 8080;

	// verbose mode
	static final boolean verbose = true;

	// Client Connection via Socket Class
	private Socket connect;

	public Server(Socket c)
	{
		connect = c;
	}

	public static void main(String[] args)
	{
		try
		{
			ServerSocket serverConnect = new ServerSocket(PORT);
			System.out.println("Server started.\nListening for connections on port : " + PORT + " ...\n");

			// we listen until user halts server execution
			while (true)
			{
				Server myServer = new Server(serverConnect.accept());

				if (verbose)
				{
					System.out.println("Connecton opened. (" + new Date() + ")");
				}

				// create dedicated thread to manage the client connection
				Thread thread = new Thread(myServer);
				thread.start();
			}

		} catch (IOException e)
		{
			System.err.println("Server Connection error : " + e.getMessage());
		}
	}

	@Override
	public void run()
	{
		// we manage our particular client connection
		BufferedReader in = null;
		PrintWriter out = null;
		BufferedOutputStream dataOut = null;
		String fileRequested = null;
		try
		{

			// we read characters from the client via input stream on the socket
			in = new BufferedReader(new InputStreamReader(connect.getInputStream()));
			// we get character output stream to client (for headers)
			out = new PrintWriter(connect.getOutputStream());
			// get binary output stream to client (for requested data)
			dataOut = new BufferedOutputStream(connect.getOutputStream());

			String reqType = in.readLine();
			String host = in.readLine();
			String connType = in.readLine();
			String contentLength = in.readLine();

			int length = Integer.parseInt(contentLength.split(":")[1].trim());

			System.out.println("Length: " + length);

			// get first line of the request from the client
			String input = "";
			int tLength = 0;

			String tBody = "";
			boolean bodyHit = false;
			while (tLength + 4 < length && (input = in.readLine()) != null)
			{
				bodyHit = bodyHit || input.contains("{");

				if (bodyHit)
				{
					tLength += input.getBytes().length;
					tBody += input + "\n";
				}
			}

			tBody += "}";

			System.out.println(tBody);

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(tBody);

			String request = obj.get("request").toString();

			sendHeader(out);

			if (request.equals("balance"))
			{
				String address = obj.get("address").toString();

				long balance = Main.getBalance(Main.parseHederaAccountIDFromString(address));

				JSONObject response = new JSONObject();
				response.put("balance", balance);

				String respString = response.toJSONString();

				respondToClient(dataOut, respString);
			}
			else
			{
				String output = "{ \"response\": \"output data\" }";

				dataOut.write(output.getBytes(), 0, output.getBytes().length);
				dataOut.flush();

			}

			in.close();
			out.close();
			dataOut.close();
			connect.close(); // we close socket connection
		} catch (Exception e)
		{

		}
	}

	public void sendHeader(PrintWriter out)
	{
		out.println("HTTP/1.1 200 OK");
		out.println("Server: Java HTTP Server from SSaurel : 1.0");
		out.println("Content-type: " + "application/json");
		out.println(); // blank line between headers and content, very important !
		out.flush(); // flush character output stream buffer
	}

	public void respondToClient(BufferedOutputStream dataOut, String data) throws Exception
	{
		dataOut.write(data.getBytes(), 0, data.getBytes().length);
		dataOut.flush();
	}

	// return supported MIME Types
	private String getContentType(String fileRequested)
	{
		if (fileRequested.endsWith(".htm") || fileRequested.endsWith(".html"))
			return "text/html";
		else
			return "text/plain";
	}
}