import createVuexStore from "../../../mock-data/mock-store";
import authApi from "@/infrastructure/shared/api/authApi";

describe("Vuex - Testing auth store module", () => {
  /* ---------------- State ---------------- */
  test("should have this initial state", () => {
    // Arrange
    const store = createVuexStore({
      status: "authenticating", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;
    // Act
    // Assert
    expect(status).toBe("authenticating");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  /* ---------------- Mutations ---------------- */
  test("Testing mutations: loginUser", () => {
    // Arrange
    const store = createVuexStore({
      status: "authenticating", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: {
        name: "test user",
        email: "testuser@test.com",
      },
      idToken: "abcdefg",
      refreshToken: "zxcvbnm",
    };
    // Act
    store.commit("auth/loginUser", payload);
    const { status, user, idToken, refreshToken } = store.state.auth;
    // Assert
    expect(status).toBe("authenticated");
    expect(user).toEqual(payload.user);
    expect(idToken).toBe("abcdefg");
    expect(refreshToken).toBe("zxcvbnm");
  });

  test("Testing mutations: logout", () => {
    // Arrange
    const store = createVuexStore({
      status: "authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: {
        name: "test user",
        email: "testuser@test.com",
      },
      idToken: "abcdefg",
      refreshToken: "zxcvbnm",
    });

    localStorage.setItem("idToken", "abcdefg");
    localStorage.setItem("refreshToken", "zxcvbnm");
    // Act
    store.commit("auth/logout");
    const { status, user, idToken, refreshToken } = store.state.auth;
    // Assert
    expect(status).toBe("not-authenticated");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();

    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  /* ---------------- Getters ---------------- */
  test("Testing getters: currentStatus ", () => {
    // Arrange
    const store = createVuexStore({
      status: "authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: {
        name: "test user",
        email: "testuser@test.com",
      },
      idToken: "abcdefg",
      refreshToken: "zxcvbnm",
    });
    // Act
    const currentStatus = store.getters["auth/currentStatus"];
    // Assert
    expect(currentStatus).toBe("authenticated");
  });

  test("Testing getters: username ", () => {
    // Arrange
    const store = createVuexStore({
      status: "authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: {
        name: "test user",
        email: "testuser@test.com",
      },
      idToken: "abcdefg",
      refreshToken: "zxcvbnm",
    });
    // Act
    const name = store.getters["auth/username"];
    // Assert
    expect(name).toBe("test user");
  });

  /* ---------------- Actions ---------------- */
  test("Testing actions: createUser - User Already Exists", async () => {
    // Arrange
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = { email: "testing@test.com", password: "123456" };
    // Act
    const { msg } = await store.dispatch("auth/createUser", newUser);
    const { status, user, idToken, refreshToken } = store.state.auth;
    // Assert
    expect(msg).toBe("EMAIL_EXISTS");

    expect(status).toBe("not-authenticated");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  test('Testing actions: createUser', async() => {
    // Arrange
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = { name: 'test user' ,email: "testing2@test.com", password: "123456" };

    // Act
    // Delete user
    await store.dispatch('auth/loginUser', { ...newUser });
    const { idToken } = store.state.auth;
    await authApi.post( ':delete', { idToken } );
    // Create User
    const { ok } = await store.dispatch('auth/createUser', newUser);
    const { 
      status, user, idToken: newIdToken, refreshToken 
    } = store.state.auth;

    // Assert
    expect( ok ).toBeTruthy();

    expect( status ).toBe('authenticated');
    expect( user ).toMatchObject( {
      name: newUser.name,
      email: newUser.email
    } );
    expect( typeof newIdToken ).toBe('string');
    expect( typeof refreshToken ).toBe('string');
  });

  test('Testing actions: checkAuth - Valid idToken', async() => {
    // Arrange
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    // Login user
    const user = { email: 'testing@test.com', password: '123456' };
    await store.dispatch('auth/loginUser', user);
    const { idToken, refreshToken } = store.state.auth;
    // Logout user
    store.commit('auth/logout');
    // Save id token in local storage
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Act
    const { ok } = await store.dispatch('auth/checkAuth');
    const { 
      status, 
      user: storeUser, 
      idToken: newIdToken, 
      refreshToken: newRefreshToken,
    } = store.state.auth;

    // Assert
    expect( ok ).toBeTruthy();

    expect( status ).toBe('authenticated');
    expect( storeUser ).toMatchObject( 
      { name: 'testing', email: user.email } 
    );
    expect( typeof newIdToken ).toBe( 'string' );
    expect( typeof newRefreshToken ).toBe( 'string' );
  });

  test('Testing actions: checkAuth - Invalid IdToken', async() => {
    // Arrange
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    // Save id token in local storage
    localStorage.setItem('idToken', 'idToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    // Act
    const { ok, msg } = await store.dispatch('auth/checkAuth');
    const { status, user, idToken, refreshToken } = store.state.auth;

    // Assert
    expect(ok).toBeFalsy();
    expect( msg ).toBe('INVALID_ID_TOKEN');

    expect(status).toBe("not-authenticated");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  test('Testing actions: checkAuth - No IdToken found', async() => {
    // Arrange
    const store = createVuexStore({
      status: "not-authenticated", // 'authenticated', 'not-authenticated'. 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');

    // Act
    const { ok, msg } = await store.dispatch('auth/checkAuth');
    const { status, user, idToken, refreshToken } = store.state.auth;

    // Assert
    expect( ok ).toBeFalsy();
    expect( msg ).toBe('token not found');

    expect( status ).toBe('not-authenticated');
    expect( user ).toBeNull();
    expect( idToken ).toBeNull();
    expect( refreshToken ).toBeNull();
  });
});
