(function () {
  angular
        .module('app')
        .directive('navbar', navbar)

  function navbar($state, $base64) {
    return {
      restrict: 'EA',
      scope:    {
        title: '=',
      },
      replace:      true,
      templateUrl:  'navbar/navbar.html',
      controllerAs: 'vm',
      controller:   function navbarController($scope, User, $location, $rootScope, $timeout, tools) {
        const vm = this
        let timeout

        vm.blur = blur
        vm.search = search
        vm.focus = focus
        vm.expand = expand
        vm.logout = logout

        function expand() {
          $rootScope.$broadcast('EXPAND')
        }

        function focus() {
          /* eslint-disable */
          form.input.focus()
          /* eslint-enable */
          if (timeout) {
            $timeout.cancel(timeout)
          }
          vm.active = true
        }

        function blur() {
          timeout = $timeout(() => {
            vm.active = false
          }, 800)
        }

        function search(feedlink) {
          if (!tools.checkUrl(feedlink)) {
            return false
          }
          $state.go('search', {
            feedlink: $base64.encode(unescape(encodeURIComponent(feedlink))),
          })
        }

        function logout() {
          User.logout().$promise.then(() => {
            $location.path('/').replace()
          })
        }
      },
    }
  }
}())
