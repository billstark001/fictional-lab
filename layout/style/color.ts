import { css } from "@linaria/core";
import { darkModeQuery } from "@/lib/theme";

export const colors = css`
  :global() {
    html {
      --gray-1: #262b33; 
      --gray-2: #3e4450;
      --gray-3: #565d6d;
      --gray-4: #8891a3;
      --gray-5: #bdc3d1;
      --gray-6: #d8dce6;
      --gray-7: #f5f6fa;

      --blue-1: #0a1b39;
      --blue-2: #0e2b5c;
      --blue-3: #1c4d82;
      --blue-4: #2b7bd8;
      --blue-5: #64adf5;
      --blue-6: #99d3fa;
      --blue-7: #e6f4ff;

      --red-1: #391212;
      --red-2: #5c1e1e;
      --red-3: #b42424;
      --red-4: #d83b3b;
      --red-5: #f56a6a;
      --red-6: #fa9e9e;
      --red-7: #fff0f0;

      --purple-1: #2a1b3d;
      --purple-2: #432b63;
      --purple-3: #6b42a1;
      --purple-4: #8659c7;
      --purple-5: #aa85e4;
      --purple-6: #c9aef5;
      --purple-7: #f7f0ff;

      --cyan-1: #0a2d2d;
      --cyan-2: #134747;
      --cyan-3: #1a8181;
      --cyan-4: #28b7b7;
      --cyan-5: #4dd2d2;
      --cyan-6: #85e6e6;
      --cyan-7: #e6ffff;

      --green-1: #0f2912;
      --green-2: #1b4721;
      --green-3: #2b7a39;
      --green-4: #3fae50;
      --green-5: #6fdc7a;
      --green-6: #a2f5aa;
      --green-7: #e8fff0;

      --yellow-1: #3d2b09;
      --yellow-2: #634311;
      --yellow-3: #a67a1a;
      --yellow-4: #d8a62b;
      --yellow-5: #f5c45a;
      --yellow-6: #fae189;
      --yellow-7: #fff9e6;

      --orange-1: #3d2209;
      --orange-2: #633511;
      --orange-3: #a64f1a;
      --orange-4: #d8702b;
      --orange-5: #f58f5a;
      --orange-6: #fab289;
      --orange-7: #fff2e6;

      --pink-1: #3d0922;
      --pink-2: #631135;
      --pink-3: #a61a5a;
      --pink-4: #d82b7a;
      --pink-5: #f55aa6;
      --pink-6: #fa89c3;
      --pink-7: #ffe6f4;

      --brown-1: #2d1a0a;
      --brown-2: #4a2e14;
      --brown-3: #7a4d24;
      --brown-4: #a66a39;
      --brown-5: #d8a67a;
      --brown-6: #f5cfaa;
      --brown-7: #fff6e8;
    }

    ${darkModeQuery} {
      --gray-1: #d8dce6; 
      --gray-2: #bdc3d1;
      --gray-3: #8891a3;
      --gray-4: #565d6d;
      --gray-5: #3e4450;
      --gray-6: #262b33;
      --gray-7: #161921; 

      --blue-1: #89c3fa;
      --blue-2: #5aa6f5;
      --blue-3: #2f7fdc;
      --blue-4: #2560c0;
      --blue-5: #1a325c;
      --blue-6: #152449;
      --blue-7: #050d1c;

      --red-1: #fa9e9e;
      --red-2: #f56a6a;
      --red-3: #d83b3b;
      --red-4: #b42424;
      --red-5: #5c1e1e;
      --red-6: #391212;
      --red-7: #1c0909;

      --purple-1: #c9aef5;
      --purple-2: #aa85e4;
      --purple-3: #8659c7;
      --purple-4: #6b42a1;
      --purple-5: #432b63;
      --purple-6: #2a1b3d;
      --purple-7: #150d1f;

      --cyan-1: #85e6e6;
      --cyan-2: #4dd2d2;
      --cyan-3: #28b7b7;
      --cyan-4: #1a8181;
      --cyan-5: #134747;
      --cyan-6: #0a2d2d;
      --cyan-7: #051616;

      --green-1: #a2f5aa;
      --green-2: #6fdc7a;
      --green-3: #3fae50;
      --green-4: #2b7a39;
      --green-5: #1b4721;
      --green-6: #0f2912;
      --green-7: #08160a;

      --yellow-1: #fae189;
      --yellow-2: #f5c45a;
      --yellow-3: #d8a62b;
      --yellow-4: #a67a1a;
      --yellow-5: #634311;
      --yellow-6: #3d2b09;
      --yellow-7: #1f1504;

      --orange-1: #fab289;
      --orange-2: #f58f5a;
      --orange-3: #d8702b;
      --orange-4: #a64f1a;
      --orange-5: #633511;
      --orange-6: #3d2209;
      --orange-7: #1f1105;

      --pink-1: #fa89c3;
      --pink-2: #f55aa6;
      --pink-3: #d82b7a;
      --pink-4: #a61a5a;
      --pink-5: #631135;
      --pink-6: #3d0922;
      --pink-7: #1f0411;

      --brown-1: #f5cfaa;
      --brown-2: #d8a67a;
      --brown-3: #a66a39;
      --brown-4: #7a4d24;
      --brown-5: #4a2e14;
      --brown-6: #2d1a0a;
      --brown-7: #160d05;
    }
  }
`;