import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

const SORT_GOODS_NAME = 'name';
const SORT_GOODS_LENGTH = 'length';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const sortGoods = (goods, sortField, isReversed) => {
  const sortedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_GOODS_NAME:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_GOODS_LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  // Реверсування
  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);

  // Сортування по довжині
  const sortByLength = () => {
    setSortField(SORT_GOODS_LENGTH);
  };

  // Сортування по алфавіту
  const sortByAlphabet = () => {
    setSortField(SORT_GOODS_NAME);
  };

  // Реверс
  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  // Ресет
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isResetVisible = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <button
        onClick={sortByAlphabet}
        type="button"
        className={classNames({
          active: sortField === SORT_GOODS_NAME,
          'is-light': sortField !== SORT_GOODS_NAME,
        })}
      >
        Sort alphabetically
      </button>
      <button
        onClick={sortByLength}
        type="button"
        className={classNames({
          active: sortField === SORT_GOODS_LENGTH,
          'is-light': sortField !== SORT_GOODS_LENGTH,
        })}
      >
        Sort by length
      </button>
      <button
        onClick={reverse}
        type="button"
        className={classNames({
          active: isReversed,
          'is-light': !isReversed,
        })}
      >
        Reverse
      </button>
      {isResetVisible && (
        <button
          onClick={reset}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
