import 'package:flutter/material.dart';
import '../models/property.dart';

class PropertyWidget extends StatelessWidget {
  final Property property;

  const PropertyWidget({super.key, required this.property});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              property.name,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(property.address),
            const SizedBox(height: 8),
            Text('Rent: \$${property.id.toString()}'),
          ],
        ),
      ),
    );
  }
}
