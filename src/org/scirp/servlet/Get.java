package org.scirp.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.scirp.util.Robot;

public class Get extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//		JSONArray jarray = new JSONArray();
//			JSONObject obj = new JSONObject();
//			obj.put("id", 1);
//			obj.put("name", "test");
//			jarray.add(obj);
		String ip=(String) request.getParameter("ip");
		renderText(ping(ip),response);
		load();
	}
	
	
	private String ping(String domain){
		return new Robot().getContentByApache("http://cdn4.scirp.org:8080/ping.php?ip="+domain, "utf-8");
	}
	
	/**
	 * Ö±½ÓÊä³ö×Ö·û´®.
	 */
	private String renderText(String text,HttpServletResponse response) {
		return render(text, "text/plain;charset=UTF-8",response);
	}
	private String render(String text, String contentType,HttpServletResponse response) {
		try {
			response.setContentType(contentType);
			response.getWriter().write(text);
		} catch (IOException e) {
		}finally{
			try {
				response.getWriter().close();
			} catch (IOException e) {
			}
		}
		return null;
	}
	
	public void load()  {
		InputStream in = getClass().getClassLoader().getResourceAsStream("/config.properties");
		Properties pro = new Properties();
		Map<String, String> urls=new HashMap<String, String>();
		try{
			pro.load(in);
			System.out.println(pro.entrySet().size());
			for (Object string: pro.keySet()) {
				urls.put(string.toString(), pro.get(string).toString());
			}
		}catch(Exception e){
			e.printStackTrace();
//			return null;
		}
//		return null;
	}

	public static void main(String[] args) {
		new	Get().load();
	}
}
