(function($, undefined) {
	"use strict";

	initializePlugin();
	var Scroller = getClass("Scroller");

	describe("Scroller", function() {

		var target, duration, scroller;

		beforeEach(function() {
			target = "body";
			duration = 500;
			scroller = new Scroller(target, duration);
		});

		it("selects the element", function() {
			expect(scroller.selectElement()).toBeMatchedBy(target);
		});

		it("scrolls the target", function() {
			var animate = jasmine.createSpy("animate");
			var stop = jasmine.createSpy("stop").and.returnValue({ animate: animate });
			var $mockElement = { stop: stop, animate: animate };
			var position = 100;

			scroller.selectElement = jasmine.createSpy("selectElement").and.returnValue($mockElement);
			scroller.to(position);

			expect(scroller.selectElement).toHaveBeenCalled();
			expect(animate).toHaveBeenCalledWith({
				"scrollTop": position
			}, duration);
		});

	});

})(jQuery);