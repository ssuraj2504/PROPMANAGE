class Payment {
  final String propertyId;
  final double amount;

  Payment({required this.propertyId, required this.amount});

  Map<String, dynamic> toJson() => {'propertyId': propertyId, 'amount': amount};
}
