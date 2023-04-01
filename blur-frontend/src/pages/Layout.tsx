import Navbar from "../components/Navbar";

interface LayoutProps {
  isEditing: boolean;
  handleEdit: () => void;
}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Navbar 
        isEditing={props.isEditing} 
        handleEdit={props.handleEdit} />
      <div>{props.children}</div>
    </>
  );
}
