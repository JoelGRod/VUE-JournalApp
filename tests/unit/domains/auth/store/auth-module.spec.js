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
    expect( status ).toBe( "not-authenticated" );
    expect( user ).toBeNull();
    expect( idToken ).toBeNull();
    expect( refreshToken ).toBeNull();

    expect( localStorage.getItem("idToken") ).toBeFalsy();
    expect( localStorage.getItem("refreshToken") ).toBeFalsy();
  });
  /* ---------------- Getters ---------------- */
  /* ---------------- Actions ---------------- */
});
