var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  // Original test, fixed
  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it('Should reduce the quality and sellIn of an item by 1 if sellIn > 0', () => {
    var gildedRose = new Shop([ new Item("Sword", 10, 10)]);
    var items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
    expect(items[0].sellIn).toEqual(9);
  });

  it('Once sellIn < 0, Quality degrades by two', () => {
    var gildedRose = new Shop([ new Item("Sword", 0, 10)]);
    var items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
    expect(items[0].sellIn).toEqual(-1);
  });

  it('Quality of an item does not degrade past 0', () => {
    var gildedRose = new Shop([ new Item("Sword", 0, 1)]);
    var items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it('Quality of an item is never more than 50', () => {
    var gildedRose = new Shop([ new Item("Aged Brie", 0, 48)]);
    for(var _ = 0; _ < 10; _++) {
      gildedRose.updateQuality();
    }
    var items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  // If Item is initialised over 50, stays above 50, which violates spec. 
  xit('Quality of Item is above 50', () => {
    var gildedRose = new Shop([ new Item("Aged Brie", 0, 60)]);
    var items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  // Currently increases by 1 if sellIn >=0, otherwise increases by 2 each day
  describe('Special Items', () => {
    xit('Aged Brie increases in quality ', () => {
      
    });

    // May change if value > 50 && items with quality > 50 get capped to 50.
    it('Sulfuras, Hand of Ragnaros: never decreases in quality', () => {
      for(var value = 1; value < 51; value++) {
      var gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, value)]);
      var items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(value);
      }
    });

    it('Backstage passes: Quality increases by 2 when there are 10 days, but more than 0', () => {
      var gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
      var items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(12);
    });

    it('Backstage passes: Quality increases by 3 when there are 5 days or less, but more than 0', () => {
      var gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
      var items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(13);
    });

    it('Backstage passes: Quality drops to 0 if sellin < 0', () => {
      var gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      var items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

});
