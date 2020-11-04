# Next.js study

## Next.js란?

### React의 SSR(server side rendering)을 쉽게 구현해주는 프레임워크

- SSR의 장점
  - SEO(Search Engine Optimization,검색엔진최적화)
  - 초기 표시 성능
    - JS를 이용해 DOM을 생성하면 스크립트 로딩이 끝난 후 렌더링되는데  
      사용자에게 초기 표시가 느려 안 좋은 인상을 줄 수 있다.

### 설치

```dos
mkdir nextStudy
cd ./nextStudy
yarn init -y
yarn add react react-dom next
```

### script 설정

```json
"scripts": {
   "dev": "next",
   "build": "next build",
   "statrt": "next start"
 }
```

---

### directory

- pages
  - 모든 페이지는 여기에 포함되어야한다.
  - index.js -> 초기페이지 <br><br>
- components
  - 공유 component <br><br>
- static
  - /static/[fileName]..
  - 이미지 파일 등

### URL QueryString

- Link

  - 해당 경로로 이동해줌(새로고침x)
  - ```js
       import Link from "next/link"

       ...
       return(
           <Link href="/[root]"> // [root]에 이동해야 할 파일 입력
               <a>Go [root]</a>
           </Link>
       )

    ```

- useRouter

  - ```js
    import { useRouter } from "next/router";

    // ex)
    // URL : .../profile?name='jake'
    // ...
    const router = useRouter();
    // ...
    const Index = () => (
      <div>
        <div>{props.query.name}</div>
      </div>
      //<div>
      //  <div>jake</div>
      //</div>
    );
    ```

- 깔끔한 URL

  - 위와 같이 작성하면 url이 지저분해질 수 있다.
  - pages 내부에 새로운 directory를 생성한다
    - /pages/p/[name].js
  - index.js

    - ```js
      import Link from "next/link";

      const ProfileLink = props => (
        <div>
          //href는 실제이동할 경로 // as는 URL에 보여줄 경로
          <Link href={`/p/[name]`} as={`/p/${props.profile}`}>
            <a>Go to {props.profile}'s profile</a>
          </Link>
        </div>
      );

      const Index = () => (
        <div>
          <ProfileLink profile="Jake" />
        </div>
      );

      export default Index;
      ```

  - [name].js

    - ```js
      import { useRouter } from "next/router";

      const [name] = () => (
        <div>
          <p>Hello, my name is {router.query.profile}. I use Next.js</p>
        </div>
      );
      ```

  - ex)

    - ```
        [id].js
        path: /pages/p/[id].js
        URL: localhost:3000/p/[id]

        -Link attr-
        href = '/p/[id]'
        as = `/p/${id}`

        <div>{Router.query.${id}}</div>
        =======

        [profile].js
        path: /pages/p/[profile].js
        URL: localhost:3000/p/[profile]

        -Link attr-
        href = '/p/[profile]'
        as = `/p/${profile}`

        <div>{Router.query.${profile}}</div>
      ```

-API 데이터 받고 시작

- getIinitialProps 메소드
- isomorphic-unfetch 모듈
- ```
  yarn add isomorphic-unfetch
  ```
- ```JS
  import fetch from "isomorphic-unfetch";
  ...
  ...
  ...
  Index.getInitialProps= async function(){
    const res = await fetch(
        "https://next.json-generator.com/api/json/get/V1UenWj_F");
    const data = await res.json();
    return {
        profiles: data.map(profile => profile.name), //
    };
  }
  ```
