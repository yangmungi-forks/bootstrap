import ScrollSpy from './scrollspy'
import Manipulator from '../dom/manipulator'

/** Test helpers */
import { getFixture, clearFixture } from '../../tests/helpers/fixture'

describe('ScrollSpy', () => {
  let fixtureEl

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    fixtureEl.style.display = 'none'
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(ScrollSpy.VERSION).toEqual(jasmine.any(String))
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(ScrollSpy.Default).toEqual(jasmine.any(Object))
    })
  })

  describe('constructor', () => {
    it('should only switch "active" class on current target', done => {
      fixtureEl.innerHTML = [
        '<div id="root" class="active" style="display: block">',
        '  <div class="topbar">',
        '    <div class="topbar-inner">',
        '      <div class="container" id="ss-target">',
        '        <ul class="nav">',
        '          <li class="nav-item"><a href="#masthead">Overview</a></li>',
        '          <li class="nav-item"><a href="#detail">Detail</a></li>',
        '        </ul>',
        '      </div>',
        '    </div>',
        '  </div>',
        '  <div id="scrollspy-example" style="height: 100px; overflow: auto;">',
        '    <div style="height: 200px;">',
        '      <h4 id="masthead">Overview</h4>',
        '      <p style="height: 200px;"></p>',
        '    </div>',
        '    <div style="height: 200px;">',
        '      <h4 id="detail">Detail</h4>',
        '      <p style="height: 200px;"></p>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('')

      const scrollSpyEl = fixtureEl.querySelector('#scrollspy-example')
      const rootEl = fixtureEl.querySelector('#root')
      const scrollSpy = new ScrollSpy(scrollSpyEl, {
        target: 'ss-target'
      })

      spyOn(scrollSpy, '_process').and.callThrough()

      scrollSpyEl.addEventListener('scroll', () => {
        expect(rootEl.classList.contains('active')).toEqual(true)
        expect(scrollSpy._process).toHaveBeenCalled()
        done()
      })

      fixtureEl.style.display = 'block'
      scrollSpyEl.scrollTop = 350
    })

    it('should only switch "active" class on current target specified w element', done => {
      fixtureEl.innerHTML = [
        '<div id="root" class="active" style="display: block">',
        '  <div class="topbar">',
        '    <div class="topbar-inner">',
        '      <div class="container" id="ss-target">',
        '        <ul class="nav">',
        '          <li class="nav-item"><a href="#masthead">Overview</a></li>',
        '          <li class="nav-item"><a href="#detail">Detail</a></li>',
        '        </ul>',
        '      </div>',
        '    </div>',
        '  </div>',
        '  <div id="scrollspy-example" style="height: 100px; overflow: auto;">',
        '    <div style="height: 200px;">',
        '      <h4 id="masthead">Overview</h4>',
        '      <p style="height: 200px;"></p>',
        '    </div>',
        '    <div style="height: 200px;">',
        '      <h4 id="detail">Detail</h4>',
        '      <p style="height: 200px;"></p>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('')

      const scrollSpyEl = fixtureEl.querySelector('#scrollspy-example')
      const rootEl = fixtureEl.querySelector('#root')
      const scrollSpy = new ScrollSpy(scrollSpyEl, {
        target: fixtureEl.querySelector('#ss-target')
      })

      spyOn(scrollSpy, '_process').and.callThrough()

      scrollSpyEl.addEventListener('scroll', () => {
        expect(rootEl.classList.contains('active')).toEqual(true)
        expect(scrollSpy._process).toHaveBeenCalled()
        done()
      })

      fixtureEl.style.display = 'block'
      scrollSpyEl.scrollTop = 350
    })

    xit('should correctly select middle navigation option when large offset is used', done => {
      fixtureEl.innerHTML = [
        '<div id="header" style="height: 500px;"></div>',
        '<nav id="navigation" class="navbar">',
        ' <ul class="navbar-nav">',
        '   <li class="nav-item active"><a class="nav-link" id="one-link" href="#one">One</a></li>',
        '   <li class="nav-item"><a class="nav-link" id="two-link" href="#two">Two</a></li>',
        '   <li class="nav-item"><a class="nav-link" id="three-link" href="#three">Three</a></li>',
        ' </ul>',
        '</nav>',
        '<div id="content" style="height: 200px; overflow-y: auto; display: block;">',
        ' <div id="one" style="height: 500px;"></div>',
        ' <div id="two" style="height: 300px;"></div>',
        ' <div id="three" style="height: 10px;"></div>',
        '</div>'
      ].join('')

      const contentEl = fixtureEl.querySelector('#content')
      const scrollSpy = new ScrollSpy(contentEl, {
        target: '#navigation',
        offset: Manipulator.position(contentEl).top
      })

      contentEl.addEventListener('scroll', () => {
        expect(fixtureEl.querySelector('#one-link').classList.contains('active')).toEqual(false)
        expect(fixtureEl.querySelector('#two-link').classList.contains('active')).toEqual(true)
        expect(fixtureEl.querySelector('#three-link').classList.contains('active')).toEqual(false)
        done()
      })

      fixtureEl.style.display = 'block'
      contentEl.scrollTop = 550
    })
  })
})
