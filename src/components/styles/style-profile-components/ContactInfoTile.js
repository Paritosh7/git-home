const ContactInfoTile = ({ Component: Icon, infoText }) => {
  return (
    <div>
      <Icon />
      <span>{infoText}</span>
    </div>
  );
};

export default ContactInfoTile;
