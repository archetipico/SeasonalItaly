import { useRef, useState } from "react";
import { copy, countLabel, fill, monthName, sayMonths } from "@/copy";
import { ItemSheet } from "@/components/ItemSheet";
import { searchItems } from "@/data/filter";
import { monthIssue } from "@/data/issue";
import { fruits, vegetables, type Item } from "@/data/seasonal";

/** Every entry, searched regardless of the month. */
const ALL = [...fruits, ...vegetables];

/**
 * Print entries as buttons opening their months.
 * @param props.items Entries to print.
 * @param props.className Class of the list.
 * @param props.onOpen Open one entry.
 * @returns List.
 */
function Names({ items, className, onOpen }: { items: Item[]; className: string; onOpen: (item: Item) => void }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.name}>
          <button type="button" className="name" onClick={() => onOpen(item)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
}

/**
 * Show the lists of a month, or the matches of a search across the whole year.
 * @param props.month Month shown, 1-indexed.
 * @returns Main section, its search text gone when the month changes because the parent keys it by month.
 */
export function MonthIssue({ month }: { month: number }) {
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState<Item | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const issue = monthIssue(month);
  const matches = searchItems(ALL, query);
  const isSearching = query.trim() !== "";

  const clear = () => {
    setQuery("");
    inputRef.current!.focus();
  };

  return (
    <main className="issue">
      <input
        ref={inputRef}
        className="issue__search"
        type="search"
        value={query}
        placeholder={copy.issue.search}
        aria-label={copy.issue.search}
        onChange={(event) => setQuery(event.target.value)}
      />

      {isSearching ? (
        <div className="issue__results">
          <p role="status" className="issue__status">
            {matches.length > 0 ? countLabel(matches.length) : fill(copy.search.noResult, { q: query.trim() })}
          </p>
          {matches.length === 0 && (
            <button type="button" className="pill" onClick={clear}>
              {fill(copy.search.back, { month: monthName(month) })}
            </button>
          )}
          <ul>
            {matches.map((item) => (
              <li key={item.name} className="result">
                <button type="button" className="name" onClick={() => setOpened(item)}>{item.name}</button>
                <span className="result__months">{sayMonths(item.peak)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {[
            { title: copy.issue.fruit, items: issue.fruit },
            { title: copy.issue.veg, items: issue.veg },
          ].map(({ title, items }) => (
            <section key={title} className="block">
              <h2 className="block__title">{title} <small>{items.length}</small></h2>
              <Names items={items} className="names-big" onOpen={setOpened} />
            </section>
          ))}
          <div className="minor">
            {[
              { title: copy.issue.soon, items: issue.soon },
              { title: copy.issue.ending, items: issue.ending },
              { title: copy.issue.away, items: issue.away },
            ]
              .filter(({ items }) => items.length > 0)
              .map(({ title, items }) => (
                <section key={title}>
                  <h3 className="minor__title">{title}</h3>
                  <Names items={items} className="names-inline" onOpen={setOpened} />
                </section>
              ))}
          </div>
        </>
      )}

      {opened && <ItemSheet item={opened} month={month} onClose={() => setOpened(null)} />}
    </main>
  );
}
