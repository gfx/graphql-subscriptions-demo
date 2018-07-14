require 'net/http'

module WebpackHelper
  WEBPACK_DEV_SERVER_PORT = 3808


  def webpack_path(name)
    __webpack_manifest.fetch(name).yield_self do |path|
      "//localhost:#{WEBPACK_DEV_SERVER_PORT}#{path}"
    end
  end

  def __webpack_manifest
    # FIXME: Read manifest.json from the filesystem on production.
    @__webpack_manifest ||= JSON.parse(Net::HTTP.get('localhost', '/assets/manifest.json', WEBPACK_DEV_SERVER_PORT))
  end
end
