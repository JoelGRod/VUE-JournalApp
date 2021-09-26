import createVuexStore from "../../../mock-data/mock-store";

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
    await store.dispatch('auth/loginUser', newUser);
    const { idToken } = store.state.auth;
    console.log(idToken);
    // Use authApi for this TODO!!
    
  });
});
