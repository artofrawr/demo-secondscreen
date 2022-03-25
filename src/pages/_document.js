import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
    }
  }

  /* eslint-disable @next/next/no-sync-scripts, @next/next/no-title-in-document-head */
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script src="/socket.io/socket.io.js" />
          <title>Second Screen Demo</title>
          <meta
            name="viewport"
            content="initial-scale=1,minimum-scale=1,width=device-width"
          />
          <meta
            property="og:url"
            content="http://demo-secondscreen.artofrawr.com"
          />
          <meta
            property="og:title"
            content="Second Screen Demo: Implemented in Next.js and socket.io"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="http://demo-secondscreen.artofrawr.com/static/secondscreen.jpg"
          />
          <meta property="og:site_name" content="The Art of Rawr" />
          <meta
            property="og:description"
            content="A second screen demo, implemented in Next.js and socket.io. The 'Art of Rawr' is the digital playground of NYC based tech lead and full stack developer Jens Fischer."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
  /* eslint-enable @next/next/no-sync-scripts */
}

export default MyDocument
