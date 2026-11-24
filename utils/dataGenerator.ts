export interface UserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export function generateRandomUser(): UserData {
  const timestamp = Date.now();
  return {
    name: `TestUser_${timestamp}`,
    email: `testuser_${timestamp}@example.com`,
    password: 'Password123!',
    firstName: 'Israel',
    lastName: 'Israeli',
    address: '123 Rothschild Blvd',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '0501234567',
  };
}
