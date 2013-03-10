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

import org.apache.commons.lang.StringUtils;
import org.scirp.util.Robot;

public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Map<String, String> serverMap;

	public void init() throws ServletException {
		load();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("serverMap", serverMap);
		request.setAttribute("ip", request.getParameter("ip"));
		getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);

	}

	private String ping(String index,String domain) {
		if(serverMap==null){
			load();
		}
		return new Robot().getContentByApache(serverMap.get(index)+"ping.php?ip=" + domain, "utf-8");
	}

	/**
	 * Ö±½ÓÊä³ö×Ö·û´®.
	 */
	protected String renderText(String text, HttpServletResponse response) {
		return render(text, "text/plain;charset=UTF-8", response);
	}

	private String render(String text, String contentType,
			HttpServletResponse response) {
		try {
			response.setContentType(contentType);
			response.getWriter().write(text);
		} catch (IOException e) {
		} finally {
			try {
				response.getWriter().close();
			} catch (IOException e) {
			}
		}
		return null;
	}

	public void load() {
		InputStream in = getClass().getClassLoader().getResourceAsStream(
				"/config.properties");
		Properties pro = new Properties();
		serverMap = new HashMap<String, String>();
		try {
			pro.load(in);
			for (Object string : pro.keySet()) {
				serverMap.put(string.toString(), pro.get(string).toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getPingData(String index,String domain) {
		String text = ping(index,domain);
		String byteLen = StringUtils.substringBetween(text, "<br/>", " ");
		String send = StringUtils.substringBetween(text, "---<br/>", " packets");
		String receive = StringUtils.substringBetween(text, ", ", " received");
		String[] time = StringUtils.substringBetween(text, "= ", " ms").split(
				"/");
		String max = time[2];
		String avg = time[1];
		String min = time[0];
		JSONArray jsons = new JSONArray();
		try {
			jsons.add(Integer.parseInt(byteLen));
			jsons.add(Integer.parseInt(send));
			jsons.add(Integer.parseInt(receive));
			jsons.add(Integer.parseInt(send) - Integer.parseInt(receive));
		} catch (Exception e) {
		}
		jsons.add(max);
		jsons.add(min);
		jsons.add(avg);
		return jsons.toString();
	}

	public String getPingDetail(String index,String domain) {
		return ping(index,domain);
	}
}
