/* eslint-env jest */
import { readdir, readFile, remove } from 'fs-extra'
import { nextBuild, File } from 'next-test-utils'
import { join } from 'path'

const fixturesDir = join(__dirname, '../..', 'css-fixtures')

describe('Basic Global Support', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'single-global')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        expect(await readFile(join(cssFolder, cssFiles[0]), 'utf8')).toContain(
          'color:red'
        )
      })
    })
  })
})

describe('Basic Global Support with special characters in path', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'single-global-special-characters', 'a+b')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        expect(await readFile(join(cssFolder, cssFiles[0]), 'utf8')).toContain(
          'color:red'
        )
      })
    })
  })
})

describe('Basic Global Support with src/ dir', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'single-global-src')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        expect(await readFile(join(cssFolder, cssFiles[0]), 'utf8')).toContain(
          'color:red'
        )
      })
    })
  })
})

describe('Multi Global Support', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'multi-global')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
        expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatchSnapshot()
      })
    })
  })
})

describe('Nested @import() Global Support', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'nested-global')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
        expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatchSnapshot()
      })
    })
  })
})

// Tests css ordering
describe('Multi Global Support (reversed)', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'multi-global-reversed')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted a single CSS file`, async () => {
        const cssFolder = join(appDir, '.next/static/css')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
        expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatchSnapshot()
      })
    })
  })
})

describe('CSS URL via `file-loader`', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'url-global')
    const nextConfig = new File(join(appDir, 'next.config.js'))

    describe.each([true, false])(`useLightnincsss(%s)`, (useLightningcss) => {
      beforeAll(async () => {
        nextConfig.write(
          `
const config = require('../next.config.js');
module.exports = {
  ...config,
  experimental: {
    useLightningcss: ${useLightningcss}
  }
}`
        )
      })

      beforeAll(async () => {
        await remove(join(appDir, '.next'))
      })

      it('should compile successfully', async () => {
        const { code, stdout } = await nextBuild(appDir, [], {
          stdout: true,
        })
        expect(code).toBe(0)
        expect(stdout).toMatch(/Compiled successfully/)
      })

      it(`should've emitted expected files`, async () => {
        const cssFolder = join(appDir, '.next/static/css')
        const mediaFolder = join(appDir, '.next/static/media')

        const files = await readdir(cssFolder)
        const cssFiles = files.filter((f) => /\.css$/.test(f))

        expect(cssFiles.length).toBe(1)
        const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
        expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatchSnapshot()

        const mediaFiles = await readdir(mediaFolder)
        expect(mediaFiles.length).toBe(3)
        expect(
          mediaFiles
            .map((fileName) =>
              /^(.+?)\..{8}\.(.+?)$/.exec(fileName).slice(1).join('.')
            )
            .sort()
        ).toMatchInlineSnapshot(`
        [
          "dark.svg",
          "dark2.svg",
          "light.svg",
        ]
      `)
      })
    })
  })
})

describe('CSS URL via `file-loader` and asset prefix (1)', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'url-global-asset-prefix-1')

    beforeAll(async () => {
      await remove(join(appDir, '.next'))
    })

    it('should compile successfully', async () => {
      const { code, stdout } = await nextBuild(appDir, [], {
        stdout: true,
      })
      expect(code).toBe(0)
      expect(stdout).toMatch(/Compiled successfully/)
    })

    it(`should've emitted expected files`, async () => {
      const cssFolder = join(appDir, '.next/static/css')
      const mediaFolder = join(appDir, '.next/static/media')

      const files = await readdir(cssFolder)
      const cssFiles = files.filter((f) => /\.css$/.test(f))

      expect(cssFiles.length).toBe(1)
      const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
      expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatch(
        /^\.red-text\{color:red;background-image:url\(\/foo\/_next\/static\/media\/dark\.[a-f0-9]{8}\.svg\) url\(\/foo\/_next\/static\/media\/dark2\.[a-f0-9]{8}\.svg\)\}\.blue-text\{color:orange;font-weight:bolder;background-image:url\(\/foo\/_next\/static\/media\/light\.[a-f0-9]{8}\.svg\);color:blue\}$/
      )

      const mediaFiles = await readdir(mediaFolder)
      expect(mediaFiles.length).toBe(3)
      expect(
        mediaFiles
          .map((fileName) =>
            /^(.+?)\..{8}\.(.+?)$/.exec(fileName).slice(1).join('.')
          )
          .sort()
      ).toMatchInlineSnapshot(`
      [
        "dark.svg",
        "dark2.svg",
        "light.svg",
      ]
    `)
    })
  })
})

describe('CSS URL via `file-loader` and asset prefix (2)', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    const appDir = join(fixturesDir, 'url-global-asset-prefix-2')

    beforeAll(async () => {
      await remove(join(appDir, '.next'))
    })

    it('should compile successfully', async () => {
      const { code, stdout } = await nextBuild(appDir, [], {
        stdout: true,
      })
      expect(code).toBe(0)
      expect(stdout).toMatch(/Compiled successfully/)
    })

    it(`should've emitted expected files`, async () => {
      const cssFolder = join(appDir, '.next/static/css')
      const mediaFolder = join(appDir, '.next/static/media')

      const files = await readdir(cssFolder)
      const cssFiles = files.filter((f) => /\.css$/.test(f))

      expect(cssFiles.length).toBe(1)
      const cssContent = await readFile(join(cssFolder, cssFiles[0]), 'utf8')
      expect(cssContent.replace(/\/\*.*?\*\//g, '').trim()).toMatch(
        /^\.red-text\{color:red;background-image:url\(\/foo\/_next\/static\/media\/dark\.[a-f0-9]{8}\.svg\) url\(\/foo\/_next\/static\/media\/dark2\.[a-f0-9]{8}\.svg\)\}\.blue-text\{color:orange;font-weight:bolder;background-image:url\(\/foo\/_next\/static\/media\/light\.[a-f0-9]{8}\.svg\);color:blue\}$/
      )

      const mediaFiles = await readdir(mediaFolder)
      expect(mediaFiles.length).toBe(3)
      expect(
        mediaFiles
          .map((fileName) =>
            /^(.+?)\..{8}\.(.+?)$/.exec(fileName).slice(1).join('.')
          )
          .sort()
      ).toMatchInlineSnapshot(`
      [
        "dark.svg",
        "dark2.svg",
        "light.svg",
      ]
    `)
    })
  })
})
