import liff from "@line/liff";

export async function getLineProfile() {
  await liff.init({
    liffId: "2010258151-BLBdEtWw",
  });

  if (!liff.isLoggedIn()) {
    liff.login();
    return null;
  }

  return await liff.getProfile();
}
