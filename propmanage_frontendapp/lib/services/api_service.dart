import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/property.dart';
import '../models/maintenance_request.dart';
import '../models/payment.dart';

class ApiService {
  static const String baseUrl = 'http://10.74.138.125:3000/api';

  static Map<String, String> get _headers => {
        'Content-Type': 'application/json',
      };

  static Future<bool> register(User user) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: _headers,
        body: jsonEncode(user.toJson()),
      );
      return response.statusCode == 200;
    } catch (e) {
      print("Register error: $e");
      return false;
    }
  }

  static Future<User?> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: _headers,
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        return User.fromJson(jsonDecode(response.body));
      } else {
        print("Login failed: ${response.body}");
      }
    } catch (e) {
      print("Login error: $e");
    }
    return null;
  }

  static Future<List<Property>> fetchProperties() async {
    try {
      final response = await http.get(Uri.parse("$baseUrl/properties"));
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => Property.fromJson(json)).toList();
      } else {
        throw Exception("Failed to load properties: ${response.body}");
      }
    } catch (e) {
      print("Fetch properties error: $e");
      return [];
    }
  }

  static Future<bool> submitMaintenance(MaintenanceRequest req) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/maintenance'),
        headers: _headers,
        body: jsonEncode(req.toJson()),
      );
      return response.statusCode == 200;
    } catch (e) {
      print("Submit maintenance error: $e");
      return false;
    }
  }

  static Future<bool> submitPayment(Payment payment) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/payment'),
        headers: _headers,
        body: jsonEncode(payment.toJson()),
      );
      return response.statusCode == 200;
    } catch (e) {
      print("Submit payment error: $e");
      return false;
    }
  }
}
