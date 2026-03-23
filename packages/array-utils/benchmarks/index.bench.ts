import { bench, describe } from "vitest";
import {
  unique,
  chunk,
  groupBy,
  flatten,
  difference,
  sortBy,
} from "../src/index";

const smallArray = Array.from({ length: 100 }, (_, i) => i);
const mediumArray = Array.from({ length: 1000 }, (_, i) => i);
const largeArray = Array.from({ length: 10000 }, (_, i) => i);

const smallArrayWithDupes = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 50),
);
const mediumArrayWithDupes = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 200),
);

const objects = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  category: i % 10,
  value: Math.random(),
}));

describe("unique", () => {
  bench("small array (100 elements)", () => {
    unique(smallArrayWithDupes);
  });

  bench("medium array (1000 elements)", () => {
    unique(mediumArrayWithDupes);
  });
});

describe("chunk", () => {
  bench("small array (100 elements) into chunks of 10", () => {
    chunk(smallArray, 10);
  });

  bench("medium array (1000 elements) into chunks of 50", () => {
    chunk(mediumArray, 50);
  });

  bench("large array (10000 elements) into chunks of 100", () => {
    chunk(largeArray, 100);
  });
});

describe("groupBy", () => {
  bench("1000 objects by category", () => {
    groupBy(objects, (item) => item.category);
  });
});

describe("flatten", () => {
  const nestedSmall = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, (_, i) => i),
  );
  const nestedMedium = Array.from({ length: 100 }, () =>
    Array.from({ length: 100 }, (_, i) => i),
  );

  bench("10x10 nested array", () => {
    flatten(nestedSmall);
  });

  bench("100x100 nested array", () => {
    flatten(nestedMedium);
  });
});

describe("difference", () => {
  bench("1000 elements vs 500 elements", () => {
    difference(smallArray, mediumArray.slice(0, 500));
  });
});

describe("sortBy", () => {
  bench("1000 objects by value", () => {
    sortBy(objects, (item) => item.value);
  });

  bench("1000 objects by value descending", () => {
    sortBy(objects, (item) => item.value, "desc");
  });
});
