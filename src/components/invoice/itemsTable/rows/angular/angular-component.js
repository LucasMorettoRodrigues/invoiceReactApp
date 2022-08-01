const angularComponent = {
  template: ` <div class=row>
              <div class=grandTotalLabel>Grand Total:</div>
              <div class=grandTotalValue>
                {{$ctrl.symbol}}{{$ctrl.total}}
              </div>
              </div>`,
  // Note addOne is not directly called,
  // but instead passed as parameter
  bindings: {
    symbol: '<',
    total: '<',
    backgrounColor: '<'
    // addOne: '<'
  }
  // controller: function($scope) {
  //   const $ctrl = $scope.$ctrl;
  //   $ctrl.value = 1;
  //   $ctrl.addOne = () => {
  //     $ctrl.value = $ctrl.value + 1;
  //     console.log('added one', $ctrl.value);
  //     $scope.$apply();
  //   }

  // }
};

export default angularComponent;