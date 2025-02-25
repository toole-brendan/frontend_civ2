#!/bin/bash

echo "Starting cleanup of defense-specific components..."

# Directories to completely remove (defense-specific)
echo "Removing defense-specific directories..."

# Maintenance - Military specific
if [ -d "src/pages/Maintenance" ]; then
  echo "Removing Maintenance directory..."
  rm -rf src/pages/Maintenance
fi

# Property - Military property accountability
if [ -d "src/pages/Property" ]; then
  echo "Removing Property directory..."
  rm -rf src/pages/Property
fi

# UnitInventory - Military unit-specific (we already have civilian Inventory)
if [ -d "src/pages/UnitInventory" ]; then
  echo "Removing UnitInventory directory..."
  rm -rf src/pages/UnitInventory
fi

# UserManagement - May need to be adapted later but removing for now
if [ -d "src/pages/UserManagement" ]; then
  echo "Removing UserManagement directory..."
  rm -rf src/pages/UserManagement
fi

# QrManagement - Has defense-specific components
if [ -d "src/pages/QrManagement" ]; then
  echo "Removing QrManagement directory..."
  rm -rf src/pages/QrManagement
fi

# Reports - Has defense-specific reporting
if [ -d "src/pages/Reports" ]; then
  echo "Removing Reports directory..."
  rm -rf src/pages/Reports
fi

# Defense-specific components in Dashboard
echo "Removing defense-specific Dashboard components..."
rm -f src/pages/Dashboard/components/PersonnelOverview.tsx
rm -f src/pages/Dashboard/components/UnitInventoryOverview.tsx
rm -f src/pages/Dashboard/components/ActionableTasks.tsx

# Remove defense-specific hooks
echo "Checking for defense-specific hooks..."
if [ -f "src/hooks/useProperty.ts" ]; then
  echo "Removing useProperty hook..."
  rm -f src/hooks/useProperty.ts
fi

# Remove defense-specific store slices
echo "Checking for defense-specific store slices..."
if [ -d "src/store/slices/property" ]; then
  echo "Removing property store slice..."
  rm -rf src/store/slices/property
fi

# Remove defense-specific types
echo "Checking for defense-specific types..."
if [ -f "src/types/property.ts" ]; then
  echo "Removing property types..."
  rm -f src/types/property.ts
fi

echo "Cleanup complete! The following military/defense-specific components have been removed:"
echo "- Maintenance module"
echo "- Property module"
echo "- UnitInventory module"
echo "- UserManagement module"
echo "- QrManagement module"
echo "- Reports module"
echo "- Defense-specific Dashboard components"
echo "- Military property hooks, store slices, and types"
echo ""
echo "You may need to update imports and routes to ensure the application still works correctly." 