#!/usr/bin/env tsx
/**
 * Firestore Setup Script
 * Initializes the Firestore database with required collections and sample data
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Firebase Admin SDK
if (!getApps().length) {
  // For local development, you can use the Firebase emulator
  // or provide service account credentials
  
  if (process.env.FIREBASE_ADMIN_SDK_JSON) {
    // Option 1: Use service account JSON
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON);
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // Option 2: Use default credentials or emulator
    console.log('⚠️  No FIREBASE_ADMIN_SDK_JSON found. Using default credentials.');
    console.log('Make sure you have set up Application Default Credentials or are using the Firebase emulator.');
    initializeApp();
  }
}

const db = getFirestore();

/**
 * Create the registrations collection with indices and sample data
 */
async function setupRegistrationsCollection() {
  console.log('📝 Setting up registrations collection...\n');

  const registrationsRef = db.collection('registrations');

  // Check if collection already has documents
  const snapshot = await registrationsRef.limit(1).get();
  
  if (!snapshot.empty) {
    console.log('✅ Collection "registrations" already exists with documents.');
    console.log(`   Current document count: ${snapshot.size} (showing first one)\n`);
    return;
  }

  // Create a sample registration document to initialize the collection
  const sampleRegistration = {
    name: 'Sample User',
    phone: '+84123456789',
    email: 'sample@example.com',
    projectTitle: 'The Global City',
    status: 'new',
    source: 'manual_entry',
    userAgent: 'Setup Script',
    ip: '127.0.0.1',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    notes: 'This is a sample registration created during setup. You can delete this.',
    contactHistory: [],
  };

  try {
    const docRef = await registrationsRef.add(sampleRegistration);
    console.log('✅ Created sample registration document with ID:', docRef.id);
    console.log('   You can delete this sample document from the Firebase Console.\n');
  } catch (error) {
    console.error('❌ Error creating sample document:', error);
    throw error;
  }
}

/**
 * Display setup instructions
 */
function displayInstructions() {
  console.log('\n' + '='.repeat(60));
  console.log('📚 FIRESTORE SECURITY RULES');
  console.log('='.repeat(60));
  console.log('\nAdd these rules to your Firestore Security Rules:');
  console.log('\n```');
  console.log(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Registrations collection
    match /registrations/{registrationId} {
      // Allow anyone to create a registration
      allow create: if request.auth == null || request.auth != null;
      
      // Only authenticated admins can read, update, delete
      allow read, update, delete: if request.auth != null 
        && request.auth.token.admin == true;
      
      // Validate data structure on create
      allow create: if request.resource.data.keys().hasAll(['name', 'phone', 'projectTitle', 'status', 'source'])
        && request.resource.data.name is string
        && request.resource.data.phone is string
        && request.resource.data.status in ['new', 'contacted', 'qualified', 'converted', 'archived'];
    }
  }
}`);
  console.log('```\n');
  
  console.log('='.repeat(60));
  console.log('🔐 RECOMMENDED INDICES');
  console.log('='.repeat(60));
  console.log('\nCreate these composite indices in Firebase Console:');
  console.log('1. Collection: registrations');
  console.log('   Fields: status (Ascending), createdAt (Descending)');
  console.log('2. Collection: registrations');
  console.log('   Fields: projectTitle (Ascending), createdAt (Descending)');
  console.log('\n');
}

/**
 * Main setup function
 */
async function main() {
  console.log('\n🔧 Firebase Firestore Setup Script\n');
  console.log('This script will initialize your Firestore database with:');
  console.log('  • registrations collection');
  console.log('  • Sample document (for initialization)');
  console.log('  • Security rules recommendations');
  console.log('  • Index recommendations\n');

  try {
    await setupRegistrationsCollection();
    displayInstructions();
    
    console.log('✅ Setup completed successfully!\n');
    console.log('Next steps:');
    console.log('1. Go to Firebase Console > Firestore Database');
    console.log('2. Apply the security rules shown above');
    console.log('3. Create the recommended indices');
    console.log('4. (Optional) Delete the sample registration document\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
main();
