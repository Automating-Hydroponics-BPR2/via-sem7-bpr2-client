import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Dialog, LazyImage, NoImage } from '../..';
import { CardProps } from './card.props';
import {
  CardButton,
  ContentHolder,
  ImageContainer,
  ItemDescription,
  ItemImageWrapper,
  ItemTitle,
  ItemTitleHolder,
  CardWrapper,
  ItemDate,
} from './card.styles';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { EditAddDeviceDialog, EditUserDialog } from '../../../components';

export const Card = React.memo((props: CardProps) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = React.useState(false);
  const [openEditAddDeviceDialog, setOpenEditAddDeviceDialog] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const { width, height, padding } = props;
  return (
    <>
      <CardWrapper
        width={width}
        height={height}
        padding={padding}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}>
        <ItemImageWrapper>
          <ImageContainer>
            {props.imgSource ? <LazyImage src={props.imgSource} /> : <NoImage iconSize={80} />}
          </ImageContainer>
          {isHovering && (
            <>
              {props.showEdit && (
                <CardButton
                  top="6px"
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    props.user ? setOpenEditUserDialog(true) : setOpenEditAddDeviceDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </CardButton>
              )}
              {props.showDelete && (
                <CardButton
                  top="38px"
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    setOpenConfirmationDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faTrashCan} color="#ef5350" />
                </CardButton>
              )}
              {props.showAdd && (
                <CardButton
                  top="70px"
                  right="-6px"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    setOpenEditAddDeviceDialog(true);
                    e.stopPropagation();
                  }}>
                  <FontAwesomeIcon icon={faCirclePlus} />
                </CardButton>
              )}
            </>
          )}
        </ItemImageWrapper>
        <ContentHolder>
          <ItemTitleHolder>
            <ItemTitle>{props.title}</ItemTitle>
            <ItemDate>{props.date}</ItemDate>
          </ItemTitleHolder>
          <ItemDescription>{props.description}</ItemDescription>
        </ContentHolder>
      </CardWrapper>
      <Dialog
        open={openConfirmationDialog}
        onClose={() => {
          setOpenConfirmationDialog(false);
        }}
        title={'Confirm deletion?'}
        children={[
          <div>
            <p>{`${
              props.device
                ? 'Are you sure you want to delete this device'
                : props.user
                ? 'Are you sure you want to delete your account'
                : 'Confirm and proceed with selected action'
            }?`}</p>
          </div>,
        ]}
        options={['Confirm', 'Cancel']}
        onOptionClick={(option: string) => {
          switch (option) {
            case 'Confirm':
              if (props.device?.id) {
                props.onDeleteClick?.(props.device.id);
              }
              if (props.user?.id) {
                props.onDeleteClick?.(props.user.id);
              }
              break;
            case 'Cancel':
              break;
            default:
              break;
          }
          setOpenConfirmationDialog(false);
        }}
        width="500px"
        height="200px"
      />
      <EditUserDialog
        open={openEditUserDialog}
        onClose={() => {
          setOpenEditUserDialog(false);
        }}
        user={props.user}
        onUserEdit={() => {
          if (props.user) {
            props.onUserEditClick?.(props.user);
          }
        }}
      />
      <EditAddDeviceDialog
        open={openEditAddDeviceDialog}
        onClose={() => {
          setOpenEditAddDeviceDialog(false);
        }}
        device={props.device ? props.device : undefined}
        onDeviceEdit={() => {
          if (props.device) {
            props.onDeviceEditClick?.(props.device);
          }
        }}
        onDeviceAdd={() => {
          props.onDeviceAddClick?.(props.device);
        }}
      />
    </>
  );
});
