package org.scirp.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.lang.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

public class Robot {
	static int i = 0;
	public static int pause = 9;
	public static String loginUrl="http://www.headandneckoncology.org/logon";
	public static String email="pubmed10010@gmail.com";
	public static String password="554321";
	 private DefaultHttpClient httpclient = new DefaultHttpClient();
	public String getContent(String Url, String encoding) {
		
		String content = "";
		int i = 0;
		// ÿ����ҳ���Ե�������Ϊ4
		while (i <= 3) {
			if (content == null || content.equals("") || content.length() / 1024 < 10) {
				content = getContents(Url, encoding);
				try {
					// �����Ƿ���ȡ�ɹ���ÿ��һ����Ϣ0-9S���漴
					Thread.sleep(new Random().nextInt(pause) * 1000);
				} catch (InterruptedException e) {
					System.out.println(e.getMessage());
				}
				i++;
			} else {
				return content;
			}

		}
		return content;
	}
public String getContentByApache(String Url, String encoding) {
		String content = "";
		int i = 0;
		// ÿ����ҳ���Ե�������Ϊ4
		while (i <= 3) {
			if (content == null || content.equals("") || content.length() / 1024 < 10) {
				content = getContentsByApache(Url, encoding);
				i++;
			} else {
				return content;
			}

		}
		return content;

	}
public String getContentsByApache(String Url, String encoding){
//	 HttpClient httpclient = new DefaultHttpClient();
     try {
         HttpGet httpget = new HttpGet(Url);
         httpget.setHeader("ContentType","application/x-www-form-urlencoded;charset="+encoding); 
         List<Header> headers = new ArrayList<Header>();  
         headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2"));  
         httpclient.getParams().setParameter("http.default-headers", headers); 
         httpclient.getParams().setParameter(ClientPNames.ALLOW_CIRCULAR_REDIRECTS, true); 
         httpclient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 60000); 
         httpclient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 60000); 
         httpclient.getParams().setParameter(CoreProtocolPNames.HTTP_CONTENT_CHARSET,encoding);
         HttpResponse  response=httpclient.execute(httpget);
         StringBuffer sb=new StringBuffer();
         BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), encoding));

				String str;
				while ((str = br.readLine()) != null) {
					sb.append(str + "\n");
				}
				br.close();
				return sb.toString();
//         ResponseHandler<String> responseHandler = new BasicResponseHandler();
//         String responseBody = httpclient.execute(httpget, responseHandler);
//         return responseBody;
     }catch(Exception e){
    	 System.out.println(e.getMessage());
    	 return null;
     } finally {
         // When HttpClient instance is no longer needed,
         // shut down the connection manager to ensure
         // immediate deallocation of all system resources
    	 // httpclient.getConnectionManager().shutdown();
     }
}

public  boolean login() {
    HttpPost httpost = new HttpPost(loginUrl);
    System.out.println("loginUrl:"+loginUrl);
    System.out.println("email:"+email);
    System.out.println("password:"+password);
    // All the parameters post to the web site
    List<NameValuePair> nvps = new ArrayList<NameValuePair>();
    nvps.add(new BasicNameValuePair("email", email));
    nvps.add(new BasicNameValuePair("password", password));
//    ResponseHandler<String> responseHandler = new BasicResponseHandler();
    try {
        httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
       HttpResponse response = httpclient.execute(httpost);
       System.out.println(response.getStatusLine().getStatusCode()+"--��½�ɹ�.........");
    } catch (Exception e) {
//        e.printStackTrace();
        return false;
    } finally {
        httpost.abort();
    }
    return true;
}
public  boolean medLogin() {
    HttpPost httpost = new HttpPost(loginUrl);
    System.out.println("loginUrl:"+loginUrl);
    System.out.println("email:"+email);
    System.out.println("password:"+password);
    // All the parameters post to the web site
    List<NameValuePair> nvps = new ArrayList<NameValuePair>();
    nvps.add(new BasicNameValuePair("user", email));
    nvps.add(new BasicNameValuePair("pass", password));
    nvps.add(new BasicNameValuePair("but_login", "Login"));
//    ResponseHandler<String> responseHandler = new BasicResponseHandler();
    try {
        httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
       HttpResponse response = httpclient.execute(httpost);
       System.out.println(response.getStatusLine().getStatusCode()+"--��½�ɹ�.........");
    } catch (Exception e) {
//        e.printStackTrace();
        return false;
    } finally {
        httpost.abort();
    }
    return true;
}

	/**
	 * ����url��ȡ��ҳ����
	 * 
	 * @param Url
	 *            �Wַ
	 * @param encoding
	 *            ��ҳ���루Ĭ��Ϊutf-8��
	 * @return
	 */
	private String getContents(String Url, String encoding) {
		StringBuffer sb = new StringBuffer();
		try {
			URL url = new URL(Url);
			HttpURLConnection httpurlconnection = (HttpURLConnection) url.openConnection();
			// αװ�����
			httpurlconnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2");
			// ���ó�ʱ��ֹ����������ʱ�����߳����޵ȴ�
			httpurlconnection.setConnectTimeout(20 * 1000);
			httpurlconnection.setReadTimeout(20 * 1000);
			if (encoding == null || encoding.equals("")) {
				encoding = "utf-8";
			}
			if (httpurlconnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
				BufferedReader br = new BufferedReader(new InputStreamReader(httpurlconnection.getInputStream(), encoding));

				String str;
				while ((str = br.readLine()) != null) {
					sb.append(str + "\n");
				}
				br.close();
				return sb.toString();
			} else if (httpurlconnection.getResponseCode() == HttpURLConnection.HTTP_BAD_REQUEST) {
				// ��sicencedirect��ip��᷵��400���󣬴�ʱ��ϢһСʱ�ٳ�����ȡ
				i++;

				if (i >= 400) {
					i = 0;
					System.out.println("����400���󣬿��ܱ��⣬��Ϣһ��Сʱ�������ȡ");
					Thread.sleep(60 * 60 * 1000);
				}
				return null;
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	
	public boolean saveContentByApache(String urlString, String encoding, String path,String fileName) {
		 HttpClient httpclient = new DefaultHttpClient();
		try {
			File f = new File(path);
			if (!f.exists() && !f.isDirectory()) {
				f.mkdirs();
			}
			File file = new File(path + "\\" + fileName);
			if (!file.exists()) {
				// String s = getContent(url, encoding);
				// ����URL
				 HttpGet httpget = new HttpGet(urlString);
		         httpget.setHeader("ContentType","application/x-www-form-urlencoded;charset="+encoding); 
//		         ResponseHandler<String> responseHandler = new BasicResponseHandler();
//		       httpclient..execute(httpget, responseHandler);
		         
				// ������
//				InputStream is = con.getInputStream();
//				// 1K�����ݻ���
//				byte[] bs = new byte[1024];
//				// ��ȡ�������ݳ���
//				int len;
				// ������ļ���
				OutputStream os = new FileOutputStream(path + "\\" + fileName);
				// ��ʼ��ȡ
//				while ((len = is.read(bs)) != -1) {
//				System.out.println(s);	
				os.write(EntityUtils.toByteArray(httpclient.execute(httpget).getEntity()));
					
//				}
				// ��ϣ��ر���������
				os.close();
//				is.close();
				return true;
			}
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	public boolean saveContentByApacheHttps(String urlString, String encoding, String path,String fileName) throws KeyManagementException, NoSuchAlgorithmException {
		 HttpClient httpclient = getInstance();
		try {
			File f = new File(path);
			if (!f.exists() && !f.isDirectory()) {
				f.mkdirs();
			}
			File file = new File(path + "\\" + fileName);
			if (!file.exists()) {
				// String s = getContent(url, encoding);
				// ����URL
				 HttpGet httpget = new HttpGet(urlString);
		         httpget.setHeader("ContentType","application/x-www-form-urlencoded;charset="+encoding); 
//		         ResponseHandler<String> responseHandler = new BasicResponseHandler();
//		       httpclient..execute(httpget, responseHandler);
		         
				// ������
//				InputStream is = con.getInputStream();
//				// 1K�����ݻ���
//				byte[] bs = new byte[1024];
//				// ��ȡ�������ݳ���
//				int len;
				// ������ļ���
				OutputStream os = new FileOutputStream(path + "\\" + fileName);
				// ��ʼ��ȡ
//				while ((len = is.read(bs)) != -1) {
//				System.out.println(s);	
				os.write(EntityUtils.toByteArray(httpclient.execute(httpget).getEntity()));
					
//				}
				// ��ϣ��ر���������
				os.close();
//				is.close();
				return true;
			}
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	public String getContentsByApacheHttps(String Url, String encoding) throws KeyManagementException, NoSuchAlgorithmException{
		HttpClient  httpclient = getInstance();
	     try {
	         HttpGet httpget = new HttpGet(Url);
	         httpget.setHeader("ContentType","application/x-www-form-urlencoded;charset="+encoding); 
	         List<Header> headers = new ArrayList<Header>();  
	         headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2"));  
	         httpclient.getParams().setParameter("http.default-headers", headers); 
	         httpclient.getParams().setParameter(ClientPNames.ALLOW_CIRCULAR_REDIRECTS, true); 
	         httpclient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 60000); 
	         httpclient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 60000); 
	         httpclient.getParams().setParameter(CoreProtocolPNames.HTTP_CONTENT_CHARSET,encoding);
	         HttpResponse  response=httpclient.execute(httpget);
	         StringBuffer sb=new StringBuffer();
	         BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), encoding));

					String str;
					while ((str = br.readLine()) != null) {
						sb.append(str + "\n");
					}
					br.close();
					return sb.toString();
//	         ResponseHandler<String> responseHandler = new BasicResponseHandler();
//	         String responseBody = httpclient.execute(httpget, responseHandler);
//	         return responseBody;
	     }catch(Exception e){
	    	 System.out.println(e.getMessage());
	    	 return null;
	     } finally {
	         // When HttpClient instance is no longer needed,
	         // shut down the connection manager to ensure
	         // immediate deallocation of all system resources
	    	 // httpclient.getConnectionManager().shutdown();
	     }
	}
	public boolean saveContent(String urlString, String encoding, String path,String fileName) {
		try {
			File f = new File(path);
			if (!f.exists() && !f.isDirectory()) {
				f.mkdirs();
			}
			File file = new File(path + "\\" + fileName);
			if (!file.exists()||(file.length()/1024)<10) {
				// String s = getContent(url, encoding);
				// ����URL
				URL url = new URL(urlString);
				// ������
				URLConnection con = url.openConnection();
				// ������
				InputStream is = con.getInputStream();
				// 1K�����ݻ���
				byte[] bs = new byte[1024];
				// ��ȡ�������ݳ���
				int len;
				// ������ļ���
				OutputStream os = new FileOutputStream(path + "\\" + fileName);
				// ��ʼ��ȡ
				while ((len = is.read(bs)) != -1) {
					os.write(bs, 0, len);
				}
				// ��ϣ��ر���������
				os.close();
				is.close();
				return true;
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return false;
		}
	}
	private static X509TrustManager tm = new X509TrustManager() {  
        public void checkClientTrusted(X509Certificate[] xcs, String string)  
                throws CertificateException {  
        }  
        public void checkServerTrusted(X509Certificate[] xcs, String string)  
                throws CertificateException {  
        }  
        public X509Certificate[] getAcceptedIssuers() {  
            return null;  
        }  
    };  
	 @SuppressWarnings("deprecation")  
	    public static HttpClient getInstance() throws KeyManagementException,  
	            NoSuchAlgorithmException {  
	        HttpClient client = new DefaultHttpClient();  
	        SSLContext ctx = SSLContext.getInstance("TLS");  
	        ctx.init(null, new TrustManager[] { tm }, null);  
	        SSLSocketFactory ssf = new SSLSocketFactory(ctx);  
	        ssf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);  
	        ClientConnectionManager ccm = client.getConnectionManager();  
	        SchemeRegistry sr = ccm.getSchemeRegistry();  
	        sr.register(new Scheme("https", ssf, 443));  
	        client = new DefaultHttpClient(ccm, client.getParams());  
	        return client;  
	    }  
	public static void main(String[] args) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println(new Robot().getContentsByApacheHttps("https://www.jstage.jst.go.jp/AF03S010Paging?request_locale=en&from=120","UTF-8"));
	}
}


