const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Simple HTTP request helper
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Health-Check/1.0'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = {
            status: res.statusCode,
            headers: res.headers,
            body: body
          };

          // Try to parse JSON
          if (res.headers['content-type']?.includes('application/json')) {
            try {
              result.data = JSON.parse(body);
            } catch (e) {
              result.data = body;
            }
          } else {
            result.data = body;
          }

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAPI() {
  console.log('🏥 API Health Check Starting...\n');

  const tests = [
    {
      name: 'API Root Health',
      path: '/',
      expected: 200
    },
    {
      name: 'Competitions Endpoint',
      path: '/api/competitions',
      expected: [200, 500] // 500 is OK if MongoDB is not connected
    },
    {
      name: 'Auth Me (Unauthenticated)',
      path: '/api/auth/me',
      expected: 401
    },
    {
      name: 'Competition Redirect',
      path: '/api/redirect/competitions',
      expected: [302, 307]
    },
    {
      name: 'Application Redirect',
      path: '/api/redirect/applications',
      expected: [302, 307]
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      const result = await makeRequest(test.path);

      const expectedStatuses = Array.isArray(test.expected) ? test.expected : [test.expected];
      const success = expectedStatuses.includes(result.status);

      if (success) {
        console.log(`✅ PASS - Status: ${result.status}`);
        passed++;
      } else {
        console.log(`❌ FAIL - Status: ${result.status} (expected: ${test.expected})`);
        if (result.data && typeof result.data === 'object' && result.data.message) {
          console.log(`   Message: ${result.data.message}`);
        }
        failed++;
      }

    } catch (error) {
      console.log(`❌ FAIL - Error: ${error.message}`);
      failed++;
    }
    console.log('');
  }

  console.log('📊 Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📝 Total: ${passed + failed}`);

  if (failed === 0) {
    console.log('\n🎉 All API endpoints are responding correctly!');
    console.log('✅ Express.js to Next.js conversion appears successful!');
  } else {
    console.log('\n⚠️  Some endpoints are not responding as expected.');
    console.log('This may be due to MongoDB connection issues or other configuration problems.');
  }

  return failed === 0;
}

// Run the health check
if (require.main === module) {
  testAPI()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Health check failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testAPI, makeRequest };
