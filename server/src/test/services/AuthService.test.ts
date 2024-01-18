import { expect, beforeEach, afterEach, describe, it, vi, Mock, SpyInstance } from 'vitest'
import { firebaseAdmin } from '../../configs/firebase';
import { AuthServiceImpl } from '../../services/AuthServiceImpl';
import { AuthorizationError } from '../../util/error/CustomError';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

describe('auth service method tests', () => {

  beforeEach(async () => {
  })

  it('validates auth token successfully', async () => {    
    const mockUID = "user1234";
    const firebaseAdminMock = vi.spyOn(firebaseAdmin.auth(), "verifyIdToken");
    firebaseAdminMock.mockResolvedValueOnce({ uid: mockUID } as DecodedIdToken);
    const result = await AuthServiceImpl.validateAuthToken("Bearer SomeToken");
    expect(result).toBe(mockUID);

  })

  it('checks that auth token is not null or empty', async () => {    
    await expect(AuthServiceImpl.validateAuthToken(null)).rejects.toThrow(AuthorizationError);
    await expect(AuthServiceImpl.validateAuthToken("")).rejects.toThrow(AuthorizationError);
  })

  it('throws AuthorizationError when bearer token does not start with "Bearer "', async () => {
    await expect(AuthServiceImpl.validateAuthToken("RandomToken")).rejects.toThrow(AuthorizationError);
  });

  it('throws AuthorizationError when verifyIdToken fails', async () => {
    const firebaseAdminMock = vi.spyOn(firebaseAdmin.auth(), "verifyIdToken");
    firebaseAdminMock.mockRejectedValueOnce(new Error("Mock error"));
    await expect(AuthServiceImpl.validateAuthToken("Bearer SomeToken")).rejects.toThrow(AuthorizationError);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
})