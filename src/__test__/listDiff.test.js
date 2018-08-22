import listDiff from '../lib/listDiff';
import { REMOVE_ELEMENT, INSERT_ELEMENT } from '../lib/VirtualDomSymbols';

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
    expect(listDiff(oldList, newList, 'id'))
      .toEqual({
        moves: [
          {
            index: 0,
            type: REMOVE_ELEMENT,
          },
          {
            index: 1,
            type: REMOVE_ELEMENT,
          },
          {
            index: 2,
            type: REMOVE_ELEMENT,
          },
        ],
        children: [
          null,
          null,
          null
        ]
      })
  })
})