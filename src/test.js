import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function SupabaseTest() {
  const [testMessage, setTestMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testSupabase() {
      try {
        // Test the connection by querying a public table
        // If you don't have a table yet, this will return an error,
        // but it will still test the connection
        const { data, error } = await supabase
          .from('test') // Replace with any table name, even if it doesn't exist
          .select('*')
          .limit(1);
        
        if (error && error.code !== 'PGRST301') throw error;
        
        setTestMessage('Supabase connection successful!');
        console.log('Query result:', data);
      } catch (error) {
        console.error('Error testing Supabase:', error);
        setError(error.message || 'An error occurred while testing Supabase connection');
      }
    }

    testSupabase();
  }, []);

  return (
    <div>
      <h2>Supabase Connection Test</h2>
      {testMessage && <p style={{ color: 'green' }}>{testMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SupabaseTest;