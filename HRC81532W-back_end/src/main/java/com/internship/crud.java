package com.internship;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class crud {
	private String jdbcURL = "jdbc:mysql://localhost:3306/grey_goose";
	private String jdbcUsername = "root";
	private String jdbcPassword = "aryanag@5602";

	private static final String INSERT_USERS_SQL = "INSERT INTO winter_internship" + "(sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted) VALUES "
			+ "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

	private static final String SELECT_USER_BY_ID = "select * from winter_internship where cust_number =?";
	private static final String DELETE_USERS_SQL = "delete from winter_internship where sl_no = ?;";
	private static final String UPDATE_USERS_SQL = "update winter_internship set invoice_currency= ?,cust_payment_terms= ? where sl_no = ?;";
	private static final String SEARCH_USERS_SQL = "select * from  winter_internship where buisness_year= ? and invoice_id= ? and doc_id = ? and cust_number=?;";
	private static final String GET_SL_NO =  "select * from winter_internship order by sl_no desc limit 1;";
	private static final String FORIGN = "SET FOREIGN_KEY_CHECKS=0;";
	public crud() {
	}

	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return connection;
	}

	public boolean insertUser(H2H user) throws SQLException {
		boolean rowDeleted;
		System.out.println(INSERT_USERS_SQL);
		int temp =0 ;
		try (Connection connection = getConnection();
			PreparedStatement preparedStat = connection.prepareStatement(GET_SL_NO);) 
			{
				ResultSet ary =  preparedStat.executeQuery();
				while (ary.next()) {
					temp = ary.getInt("sl_no");
				}
				System.out.println(temp);
			} catch (SQLException e) {
				printSQLException(e);
			}
//		try (Connection connection = getConnection();
//				PreparedStatement preparedStatem = connection.prepareStatement(FORIGN);) 
//				{
//				 preparedStatem.executeQuery();
//				} catch (SQLException e) {
//					printSQLException(e);
//				}
//		System.out.println("Done");
			try (Connection connection = getConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USERS_SQL) ;)
			{
				preparedStatement.setInt(1, temp+1);
				preparedStatement.setString(2, user.getBusiness_code());
				preparedStatement.setString(3, user.getCust_number());
				preparedStatement.setString(4, user.getClear_date());
				preparedStatement.setInt(5, user.getBuisness_year());
				preparedStatement.setString(6, user.getDoc_id());
				preparedStatement.setString(7, user.getPosting_date());
				preparedStatement.setString(8, user.getDocument_create_date());
				preparedStatement.setString(9, user.getDocument_create_date1());
				preparedStatement.setString(10, user.getDue_in_date());
				preparedStatement.setString(11, user.getInvoice_currency());
				preparedStatement.setString(12, user.getDocument_type());
				preparedStatement.setInt(13, user.getPosting_id());
				preparedStatement.setString(14, user.getArea_business());
				preparedStatement.setDouble(15, user.getTotal_open_amount());
				preparedStatement.setString(16, user.getBaseline_create_date());
				preparedStatement.setString(17, user.getCust_payemnt_terms());
				preparedStatement.setString(18, user.getInvoice_id());
				preparedStatement.setInt(19, user.getIsOpen());
				preparedStatement.setString(20, user.getAging_bucket());
				preparedStatement.setBoolean(21, user.getIs_deleted());
				preparedStatement.executeUpdate();
				System.out.println(preparedStatement);
		} catch (SQLException e) {
			printSQLException(e);
		}
		return true;
	}

	public HashMap selectUser(int id) {
		H2H user = null;
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		ArrayList<H2H>  Bills = new ArrayList<H2H>();
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USER_BY_ID);) 
		{
			preparedStatement.setInt(1, id);
			System.out.println(preparedStatement);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				 user = new H2H(rs.getInt("sl_no"), rs.getString("business_code"), rs.getString("cust_number"), rs.getString("clear_date"),rs.getInt("buisness_year"), rs.getString("doc_id"), rs.getString("posting_date"), rs.getString("document_create_date"),rs.getString("document_create_date1"), rs.getString("due_in_date"),rs.getString("document_type"), rs.getString("document_type"), rs.getInt("posting_id"), rs.getString("area_business"),rs.getDouble("total_open_amount"),rs.getString("baseline_create_date"), rs.getString("cust_payment_terms"), rs.getString("invoice_id"), rs.getInt("isOpen"),rs.getString("aging_bucket"),rs.getBoolean("is_deleted"));
				 Bills.add(user);
			}
			Response.put("Bills",Bills);
		} catch (SQLException e) {
			printSQLException(e);
		}
		return Response;
	}
	public HashMap searchUser(int business_year,String doc_id,String invoice_id,String cust_number) {
		H2H user = null;
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		ArrayList<H2H>  Bills = new ArrayList<H2H>();
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SEARCH_USERS_SQL);) 
		{
			preparedStatement.setInt(1, business_year);
			preparedStatement.setString(2, invoice_id);
			preparedStatement.setString(3, doc_id);
			preparedStatement.setString(4, cust_number);
			System.out.println(preparedStatement);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				 user = new H2H(rs.getInt("sl_no"), rs.getString("business_code"), rs.getString("cust_number"), rs.getString("clear_date"),rs.getInt("buisness_year"), rs.getString("doc_id"), rs.getString("posting_date"), rs.getString("document_create_date"),rs.getString("document_create_date1"), rs.getString("due_in_date"),rs.getString("document_type"), rs.getString("document_type"), rs.getInt("posting_id"), rs.getString("area_business"),rs.getDouble("total_open_amount"),rs.getString("baseline_create_date"), rs.getString("cust_payment_terms"), rs.getString("invoice_id"), rs.getInt("isOpen"),rs.getString("aging_bucket"),rs.getBoolean("is_deleted"));
				 Bills.add(user);
			}
			Response.put("Bills",Bills);
		} catch (SQLException e) {
			printSQLException(e);
		}
		return Response;
	}


	public boolean deleteUser(int id) throws SQLException {
		boolean rowDeleted;
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(DELETE_USERS_SQL);) {
			statement.setInt(1, id);
			rowDeleted = statement.executeUpdate() > 0;
		}
		return rowDeleted;
	}

	public boolean updateUser(int id, String pay,String inv) throws SQLException {
		boolean rowUpdated;
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_USERS_SQL);) {
			System.out.println("updated USer:"+ preparedStatement);
			preparedStatement.setString(1, inv);
			preparedStatement.setString(2, pay);
			preparedStatement.setInt(3, id);

			rowUpdated = preparedStatement.executeUpdate() > 0;
		}
		return rowUpdated;
	}

	private void printSQLException(SQLException ex) {
		for (Throwable e : ex) {
			if (e instanceof SQLException) {
				e.printStackTrace(System.err);
				System.err.println("SQLState: " + ((SQLException) e).getSQLState());
				System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
				System.err.println("Message: " + e.getMessage());
				Throwable t = ex.getCause();
				while (t != null) {
					System.out.println("Cause: " + t);
					t = t.getCause();
				}
			}
		}
	}

}

