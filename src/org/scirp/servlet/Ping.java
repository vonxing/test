package org.scirp.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Ping extends InitServlet {
	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String ip=(String) request.getParameter("ip");
		String type = (String) request.getParameter("type");
		String index = (String) request.getParameter("index");
		if (type != null && type.equals("ping")) {
			String text = getPingData(index,ip);
			renderText(text, response);
		}else{
			String text=getPingDetail(index,ip);
			renderText(text,response);
		}
	}
	
	
	
	
	
	
}
