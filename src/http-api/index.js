import axios from "axios";

export const HOST = "http://beluv-dev.mayoube.co.kr/web";

export const headers = () => {
  return {
    "Content-Type": "application/json",
    "LOGIN-TYPE": "ADMIN",
    "X-ACCESS-TOKEN":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyMi0wOS0wMiAxNToxMzoxOSIsImVtYWlsIjoiaGoua3dvbkBtYXlvdWJlLmNvLmtyIiwibG9naW5UeXBlIjoiQURNSU4ifQ.XjsHSnHrTONfwXVSRc_Bm2UJwp0fID3yFpzQvKJK_yA",
  };
};

export function getAppUserInfo() {
  return axios.get(`${HOST}/user/count`, {
    headers: headers()
  }).then((res) => res)
}

export function getProductReviews(productId) {
  return axios
    .post(
      "http://beluvapicore-env.eba-swmkh4rv.ap-northeast-2.elasticbeanstalk.com/api/Review/ProductReviewList",
      {
        productId: productId,
        categoryId: 0,
        photoCheck: 0,
        filter: 0,
        userId: 0,
        startNo: 0,
        endNo: 1000,
      },
      { headers: headers() }
    )
    .then((res) => res);
}

export function getReviewRating(productId) {
  return axios.post(
    "http://beluvapicore-env.eba-swmkh4rv.ap-northeast-2.elasticbeanstalk.com/api/Review/Review_Rating",
    {
      productId: productId,
      userId: 0,
    },
    { headers: headers() }
  )
  .then((res) => res)
}
