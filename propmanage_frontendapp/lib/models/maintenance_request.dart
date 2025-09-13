class MaintenanceRequest {
  final String propertyId;
  final String description;

  MaintenanceRequest({required this.propertyId, required this.description});

  Map<String, dynamic> toJson() =>
      {'propertyId': propertyId, 'description': description};
}
