# CardItems Component

This component displays a set of cards with custom icons, numbers, and percentages.  
You must pass an array of card data as the `data` prop.

## Usage

### 1. Import the Component

```tsx
import CardItems from "./Work/cardItems/cardItems";
```

### 2. Prepare Card Data

Each card object should match this shape:

```tsx
const cardData = [
  {
    title: "All Users",
    backgroundIcon: "#4680FF",
    svg: <YourSvgComponent />, // or any JSX SVG
    number: 50,
    percentage: "30.6%",
    percentageColor: "#4680FF",
  },
  // Add more cards as needed
];
```

### 3. Render the Component

```tsx
<CardItems data={cardData} />
```

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| data | `CardDataType[]` | Yes | Array of card objects to display |

### CardDataType

```tsx
interface CardDataType {
  title: string;
  backgroundIcon: string;
  svg: React.ReactNode;
  number: number;
  percentage: string;
  percentageColor: string;
}
```

## Example

```tsx
import CardItems from "./Work/cardItems/cardItems";

const cardData = [
  {
    title: "All Users",
    backgroundIcon: "#4680FF",
    svg: (
      <svg width="24" height="24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#4680FF" />
      </svg>
    ),
    number: 50,
    percentage: "30.6%",
    percentageColor: "#4680FF",
  },
  // ...3 more cards
];

function Dashboard() {
  return <CardItems data={cardData} />;
}
```

## Notes

- The `svg` field can be any JSX element (SVG icon).
- Style and layout are handled by the component and `cardItems.css`.