import fetch from "jest-fetch-mock";
import { mocked } from "jest-mock";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-auth-session");

fetchMock.enableMocks();

describe("Auth Hook", () => {
  it("should be able to sign with Google account existing", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "rodrigo.goncalves@rocketseat.team",
        given_name: "Rodrigo",
        picture: "any_photo.png",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    console.log("USER PROFILE =>", result.current.user);

    expect(result.current.user).toBeTruthy();
  });
  it("user shold not connect if cancel auth", () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());

    console.log("USER PROFILE =>", result.current.user);

    expect(result.current.user.id).toBeFalsy();
  });
});
