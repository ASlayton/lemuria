import PropTypes from 'prop-types';

const characterShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentHealth: PropTypes.number.isRequired,
  totalHealth: PropTypes.number.isRequired,
  currentPsyche: PropTypes.number.isRequired,
  totalPsyche: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  fortitude: PropTypes.number.isRequired,
  resilience: PropTypes.number.isRequired,
  constitution: PropTypes.number.isRequired,
  exp: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
});

const characterOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    noneSelected: PropTypes.string.isRequired,
  }),
  characterShape,
]);

export default { characterShape, characterOptionalShape };
