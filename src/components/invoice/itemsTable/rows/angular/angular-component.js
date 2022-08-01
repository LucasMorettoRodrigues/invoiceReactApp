const angularComponent = {
  template: ` <div class=row>
              <div class=grandTotalLabel>Grand Total:</div>
              <div class=grandTotalValue>
                {{$ctrl.symbol}}{{$ctrl.total}}
              </div>
              </div>`,

  bindings: {
    symbol: '<',
    total: '<',
  }
};

export default angularComponent;