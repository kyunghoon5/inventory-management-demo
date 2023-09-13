import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface Link {
  label: string;
  to: string;
}

const Links: Link[] = [
  { label: 'Growth Plan', to: '/tracking/all' },
  { label: 'Schedule', to: '/tracking/schedule' },
];

const PlanningNavbar = () => {
  return (
    <div className="p-8">
      <div className="text-lg font-bold text-gray-500 pb-8 flex justify-start gap-7">
        {Links.map((item) => (
          <div key={item.to}>
            <NavLink
              to={item.to}
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'none' : 'none',
                  color: isActive ? '#7c3aed' : '#6b7280',
                  textDecorationLine: isActive ? 'underline ' : 'none',
                  textDecorationColor: '#7c3aed',
                  textDecorationThickness: '3px',
                  textUnderlinePosition: 'under',
                };
              }}
              className="duration-500"
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningNavbar;
