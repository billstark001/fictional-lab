import { css } from "@linaria/core";
import { darkModeQuery } from "@/lib/theme";
export const colors = css`

  :global() {
    html {
      --gray-5: #1d2025;
      --gray-10: #262a30;
      --gray-20: #333942;
      --gray-30: #4a4f5a;
      --gray-40: #606575;
      --gray-50: #8891a3;
      --gray-60: #b0b8ca;
      --gray-70: #c7cdd8;
      --gray-80: #e0e3ea;
      --gray-90: #eff1f5;
      --gray-95: #f7f8fc;

      --blue-5: #08162e;
      --blue-10: #0c203f;
      --blue-20: #13325e;
      --blue-30: #1f4b85;
      --blue-40: #2765a4;
      --blue-50: #2b7bd8;
      --blue-60: #64adf5;
      --blue-70: #89c4fa;
      --blue-80: #b3dcfd;
      --blue-90: #d9eefb;
      --blue-95: #edf8ff;

      --red-5: #2e0c0c;
      --red-10: #491212;
      --red-20: #5c1e1e;
      --red-30: #8c2929;
      --red-40: #b42424;
      --red-50: #d83b3b;
      --red-60: #f56a6a;
      --red-70: #f79696;
      --red-80: #fbc3c3;
      --red-90: #fde5e5;
      --red-95: #fff5f5;

      --purple-5: #1e1233;
      --purple-10: #2c1c49;
      --purple-20: #432b63;
      --purple-30: #5a3f8b;
      --purple-40: #6b42a1;
      --purple-50: #8659c7;
      --purple-60: #aa85e4;
      --purple-70: #c3a8f0;
      --purple-80: #e2d2fa;
      --purple-90: #f4ebfe;
      --purple-95: #f9f4ff;

      --cyan-5: #062626;
      --cyan-10: #093838;
      --cyan-20: #134747;
      --cyan-30: #1a6565;
      --cyan-40: #1a8181;
      --cyan-50: #28b7b7;
      --cyan-60: #4dd2d2;
      --cyan-70: #85e6e6;
      --cyan-80: #b3f4f4;
      --cyan-90: #d9fcfc;
      --cyan-95: #efffff;

      --green-5: #0b2510;
      --green-10: #153c1c;
      --green-20: #1b4721;
      --green-30: #256d34;
      --green-40: #2b7a39;
      --green-50: #3fae50;
      --green-60: #6fdc7a;
      --green-70: #91e79c;
      --green-80: #c0f4ca;
      --green-90: #e0fbe5;
      --green-95: #f2fff3;

      --yellow-5: #2e2007;
      --yellow-10: #3f2d0a;
      --yellow-20: #634311;
      --yellow-30: #8b651a;
      --yellow-40: #a67a1a;
      --yellow-50: #d8a62b;
      --yellow-60: #f5c45a;
      --yellow-70: #f8d588;
      --yellow-80: #fce9b3;
      --yellow-90: #fdf4d9;
      --yellow-95: #fffcf0;

      --orange-5: #2d1907;
      --orange-10: #401f0a;
      --orange-20: #633511;
      --orange-30: #8b4e1a;
      --orange-40: #a64f1a;
      --orange-50: #d8702b;
      --orange-60: #f58f5a;
      --orange-70: #f8ac85;
      --orange-80: #fbcfb3;
      --orange-90: #fde7d9;
      --orange-95: #fff4ee;

      --pink-5: #2e071e;
      --pink-10: #400a29;
      --pink-20: #631135;
      --pink-30: #8c1a4d;
      --pink-40: #a61a5a;
      --pink-50: #d82b7a;
      --pink-60: #f55aa6;
      --pink-70: #f88bbe;
      --pink-80: #fcbad3;
      --pink-90: #fde4ef;
      --pink-95: #fff2f8;

      --brown-5: #231308;
      --brown-10: #2f1b0c;
      --brown-20: #4a2e14;
      --brown-30: #6f4521;
      --brown-40: #7a4d24;
      --brown-50: #a66a39;
      --brown-60: #d8a67a;
      --brown-70: #eac8a2;
      --brown-80: #f5e3cb;
      --brown-90: #fbf4e9;
      --brown-95: #fefaf2;
    }

    ${darkModeQuery} {
      --gray-5: #f7f8fc;
      --gray-10: #eff1f5;
      --gray-20: #e0e3ea;
      --gray-30: #c7cdd8;
      --gray-40: #b0b8ca;
      --gray-50: #8891a3;
      --gray-60: #606575;
      --gray-70: #4a4f5a;
      --gray-80: #333942;
      --gray-90: #262a30;
      --gray-95: #1d2025;

      --blue-5: #edf8ff;
      --blue-10: #d9eefb;
      --blue-20: #b3dcfd;
      --blue-30: #89c4fa;
      --blue-40: #64adf5;
      --blue-50: #2b7bd8;
      --blue-60: #2765a4;
      --blue-70: #1f4b85;
      --blue-80: #13325e;
      --blue-90: #0c203f;
      --blue-95: #08162e;

      --red-5: #fff5f5;
      --red-10: #fde5e5;
      --red-20: #fbc3c3;
      --red-30: #f79696;
      --red-40: #f56a6a;
      --red-50: #d83b3b;
      --red-60: #b42424;
      --red-70: #8c2929;
      --red-80: #5c1e1e;
      --red-90: #491212;
      --red-95: #2e0c0c;

      --purple-5: #f9f4ff;
      --purple-10: #f4ebfe;
      --purple-20: #e2d2fa;
      --purple-30: #c3a8f0;
      --purple-40: #aa85e4;
      --purple-50: #8659c7;
      --purple-60: #6b42a1;
      --purple-70: #5a3f8b;
      --purple-80: #432b63;
      --purple-90: #2c1c49;
      --purple-95: #1e1233;

      --cyan-5: #efffff;
      --cyan-10: #d9fcfc;
      --cyan-20: #b3f4f4;
      --cyan-30: #85e6e6;
      --cyan-40: #4dd2d2;
      --cyan-50: #28b7b7;
      --cyan-60: #1a8181;
      --cyan-70: #1a6565;
      --cyan-80: #134747;
      --cyan-90: #093838;
      --cyan-95: #062626;

      --green-5: #f2fff3;
      --green-10: #e0fbe5;
      --green-20: #c0f4ca;
      --green-30: #91e79c;
      --green-40: #6fdc7a;
      --green-50: #3fae50;
      --green-60: #2b7a39;
      --green-70: #256d34;
      --green-80: #1b4721;
      --green-90: #153c1c;
      --green-95: #0b2510;

      --yellow-5: #fffcf0;
      --yellow-10: #fdf4d9;
      --yellow-20: #fce9b3;
      --yellow-30: #f8d588;
      --yellow-40: #f5c45a;
      --yellow-50: #d8a62b;
      --yellow-60: #a67a1a;
      --yellow-70: #8b651a;
      --yellow-80: #634311;
      --yellow-90: #3f2d0a;
      --yellow-95: #2e2007;

      --orange-5: #fff4ee;
      --orange-10: #fde7d9;
      --orange-20: #fbcfb3;
      --orange-30: #f8ac85;
      --orange-40: #f58f5a;
      --orange-50: #d8702b;
      --orange-60: #a64f1a;
      --orange-70: #8b4e1a;
      --orange-80: #633511;
      --orange-90: #401f0a;
      --orange-95: #2d1907;

      --pink-5: #fff2f8;
      --pink-10: #fde4ef;
      --pink-20: #fcbad3;
      --pink-30: #f88bbe;
      --pink-40: #f55aa6;
      --pink-50: #d82b7a;
      --pink-60: #a61a5a;
      --pink-70: #8c1a4d;
      --pink-80: #631135;
      --pink-90: #400a29;
      --pink-95: #2e071e;

      --brown-5: #fefaf2;
      --brown-10: #fbf4e9;
      --brown-20: #f5e3cb;
      --brown-30: #eac8a2;
      --brown-40: #d8a67a;
      --brown-50: #a66a39;
      --brown-60: #7a4d24;
      --brown-70: #6f4521;
      --brown-80: #4a2e14;
      --brown-90: #2f1b0c;
      --brown-95: #231308;
    }
  }
`;