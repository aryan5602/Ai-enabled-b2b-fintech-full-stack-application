package com.internship;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class dataloading
 */
@WebServlet("/dataloading")
public class dataloading extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dataloading() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		ArrayList<H2H>  Bills = new ArrayList<H2H>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","aryanag@5602");
			PreparedStatement ps = connection.prepareStatement("select * from winter_internship");
			//ps.setInt(1,15);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				H2H bill = new H2H(rs.getInt("sl_no"), rs.getString("business_code"), rs.getString("cust_number"), rs.getString("clear_date"),rs.getInt("buisness_year"), rs.getString("doc_id"), rs.getString("posting_date"), rs.getString("document_create_date"),rs.getString("document_create_date1"), rs.getString("due_in_date"),rs.getString("invoice_currency"), rs.getString("document_type"), rs.getInt("posting_id"), rs.getString("area_business"),rs.getDouble("total_open_amount"),rs.getString("baseline_create_date"), rs.getString("cust_payment_terms"), rs.getString("invoice_id"), rs.getInt("isOpen"),rs.getString("aging_bucket"),rs.getBoolean("is_deleted"));
				Bills.add(bill);
			}
			Response.put("Bills",Bills);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		Gson gson = new Gson();
		String jsonResponse = gson.toJson(Response);
		response.setHeader("Access-Control-Allow-Origin","*");
		response.getWriter().append(jsonResponse);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
