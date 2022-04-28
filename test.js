import { ClientFunction, Selector, t } from 'testcafe';

class PageModel {
  constructor() {
    this.indexes = Selector('.index');
    this.names = Selector('.name');
  }
}

const model = new PageModel();

const results = [
  { index: '1', name: 'a' },
  { index: '2', name: 'b' },
  { index: '3', name: 'c' },
];

const resultsReversed = results.concat([]).reverse();

fixture`Selector implicit resolution test`
  .page`http://localhost:8000/index.html`

test('list reverses successfully', async () => {
  const iterator = Array(3).keys();

  Array.from(iterator).forEach(async (i) => {
    await t
      .expect(model.indexes.nth(i).innerText).eql(results[i].index)
      .expect(model.names.nth(i).innerText).eql(results[i].name);
  });

  const reverseListItems = ClientFunction(() => {
    const ul = document.querySelector('ul');
    const li = document.querySelectorAll('li');
    const f = document.createDocumentFragment();
    for (let i = li.length - 1; i > -1; i -= 1) {
      f.append(li[i]);
    }
    ul.append(f);
  });
  await reverseListItems();

  Array.from(iterator).forEach(async (i) => {
    await t
    .expect(model.indexes.nth(i).innerText).eql(resultsReversed[i].index)
    .expect(model.names.nth(i).innerText).eql(resultsReversed[i].name);
  });
});
