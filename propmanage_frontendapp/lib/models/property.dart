class Property {
  final String id;
  final String name;
  final String address;
  final String status;
  final Manager manager;
  final String createdAt;

  Property({
    required this.id,
    required this.name,
    required this.address,
    required this.status,
    required this.manager,
    required this.createdAt,
  });

  factory Property.fromJson(Map<String, dynamic> json) {
    return Property(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      address: json['address'] ?? '',
      status: json['status'] ?? '',
      manager: Manager.fromJson(json['managerId'] ?? {}),
      createdAt: json['createdAt'] ?? '',
    );
  }
}

class Manager {
  final String id;
  final String name;
  final String email;

  Manager({
    required this.id,
    required this.name,
    required this.email,
  });

  factory Manager.fromJson(Map<String, dynamic> json) {
    return Manager(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
    );
  }
}
