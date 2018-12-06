class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isNotAgedBrie(i) {
    return this.items[i].name != "Aged Brie";
  }

  isNotTicket(i) {
    return this.items[i].name != "Backstage passes to a TAFKAL80ETC concert";
  }

  isNotSulfuras(i) {
    return this.items[i].name != "Sulfuras, Hand of Ragnaros";
  }
  updateQuality() {
    //loop though the
    for (let i = 0; i < this.items.length; i++) {
      if (this.isNotAgedBrie(i) && this.isNotTicket(i)) {
        if (this.items[i].quality > 0) {
          if (this.isNotSulfuras(i)) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.isNotSulfuras(i)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.isNotAgedBrie(i)) {
          if (this.isNotTicket(i)) {
            if (this.items[i].quality > 0) {
              if (this.isNotSulfuras(i)) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
