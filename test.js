import { ClientFunction, Selector, t } from 'testcafe';

const results = ['1', '2', '3'];
const resultsReversed = results.concat([]).reverse();

fixture`Implicit Selector resolution in async forEach`
  .page`http://localhost:8000/index.html`

test('list reverses successfully', async () => {
  const listItems = Selector('li');
  const iterator = Array(3).keys();

  Array.from(iterator).forEach(async (i) => {
    console.log('Loop 1:', i);
    await t
      .expect(listItems.nth(i).innerText).eql(results[i]);
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
    console.log('Loop 2:', i);
    await t
      .expect(listItems.nth(i).innerText).eql(resultsReversed[i]);
  });
});
