import './ActivityFeed.css';

const typeLabels = {
  'movie.viewed': '👁 Viewed',
  'movie.rated': '★ Rated',
  'watchlist.updated': '📋 Watchlist',
};

export default function ActivityFeed({ activities }) {
  if (!activities?.length) {
    return <p className="activity-empty">No activity yet. Browse movies to get started!</p>;
  }

  return (
    <ul className="activity-feed">
      {activities.map((item, i) => (
        <li key={item._id} style={{ animationDelay: `${i * 0.06}s` }}>
          <span className="activity-type">{typeLabels[item.type] || item.type}</span>
          <p>{item.message || item.metadata?.message || 'Activity recorded'}</p>
          <time>{new Date(item.createdAt).toLocaleString()}</time>
        </li>
      ))}
    </ul>
  );
}
