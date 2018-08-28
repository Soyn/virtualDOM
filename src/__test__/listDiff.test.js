import listDiff from '../lib/listDiff';
import { REMOVE_ELEMENT, INSERT_ELEMENT } from '../lib/VirtualDomSymbols';

const applyMoves = (oldList, moves) => {
  moves.forEach(move => {
    if (move.type === REMOVE_ELEMENT) {
      oldList.splice(move.index, 1);
    } else {
      oldList.splice(move.index, 0, move.item);
    }
  })
}

const asssertEquals = (oldList, newList) => {
  expect(oldList.length).toEqual(newList.length);
  oldList.forEach((item, i) => {
    expect(item).toEqual(newList[i]);
  })
}
describe('test list diff algorithm', () => {
  test('old list and new list are same', () => {
    const oldList = [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'}
    ];
    const newList = [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'}
    ];
    expect(listDiff(oldList, newList)).toEqual({
      moves: [],
      children: [
        {id: 'a'},
        {id: 'b'},
        {id: 'c'}
      ],
    })
  });
  test('remove element from old list', () => {
    const oldList = [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'},
    ];
    const newList = [
      {id: 'b'},
      {id: 'c'},
    ];
    expect(listDiff(oldList, newList, 'id'))
      .toEqual({
        moves: [
          {
            type: REMOVE_ELEMENT,
            index: 0,
          }
        ],
        children: [
          null,
          {id: 'b'},
          {id: 'c'},
        ]
      })
  });

  test('remove all the element from old list', () => {
    const oldList = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];
    const newList = [];
    const diffs = listDiff(oldList, newList, 'id');
    applyMoves(oldList, diffs.moves);
    asssertEquals(oldList, newList);
  });

  test('Insert element in head', () => {
    const oldList = [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'},
      {id: 'd'},
      {id: 'e'},
      {id: 'f'},
    ];
    const newList = [
      {id: 'aa'},
      {id: 'a'},
      {id: 'b'},
      {id: 'c'},
      {id: 'd'},
      {id: 'e'},
      {id: 'f'},
    ];
    const diffs = listDiff(oldList, newList, 'id');
    applyMoves(oldList, diffs.moves);
    expect(diffs.moves.length).toEqual(1);
    asssertEquals(oldList, newList);
  });
  test('Reorder elements', () => {
    const oldList = [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'},
      {id: 'd'},
      {id: 'e'},
    ];

    const newList = [
      {id: 'b'},
      {id: 'a'},
      {id: 'd'},
      {id: 'c'},
      {id: 'e'},
    ];

    const diffs = listDiff(oldList, newList, 'id');
    expect(diffs.moves.length).toEqual(4);
    applyMoves(oldList, diffs.moves);
    asssertEquals(oldList, newList);
  })
})