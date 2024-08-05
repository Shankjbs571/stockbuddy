// 'use client'

// import Image from "next/image";
// import { firestore } from "../firebaseConfig.js";
// import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { collection, getDocs, query, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');

//   useEffect(() => {
//     updateInventory()
//     // addDocument()
//   }, [])

//   const addDocument = async () => {
//     try {
//       const docRef = doc(collection(firestore, 'stock'), 'test-doc'); // 'test-doc' is the ID of the document
//       await setDoc(docRef, {
//         name: 'Test Item',
//         count: 100,
//         description: 'This is a test item'
//       });
//       console.log('Document successfully written!');
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   };

//   const updateInventory = async () => {
//     const querySnapshot = await getDocs(collection(firestore, 'stock'));
//     const inventory = [];
//     querySnapshot.forEach((doc) => {
//       inventory.push({ id: doc.id, ...doc.data() });
//     });
//     console.log('Inventory data:', inventory);
//     setInventory(inventory)
//   }

//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, 'stock'), item)
//     const docSnap = await getDoc(docRef)

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data()
//       if (quantity === 1) {
//         await deleteDoc(docRef)
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 })
//       }
//     }

//     await updateInventory()
//   }

//   const addItem = async (item) => {
//     const docRef = doc(collection(firestore, 'stock'), item)
//     const docSnap = await getDoc(docRef)

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data()
//       await setDoc(docRef, { quantity: quantity + 1 })
//     } else {
//       await setDoc(docRef, { name: item, quantity: 1 })
//     }

//     await updateInventory()
//   }

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)


//   return (
//     <Box width="100vw" height="100vh" display="flex" flexDirection="column " justifyContent="center" alignItems="center">
//       <Typography variant="h1">stockBuddy</Typography>
//       <Modal
//        open = {open}
//        onClose={handleClose} 
//       >
//         <Box 
//          position="absolute"
//          top="50%"
//          left="50%"
//          width={400}
//          bgcolor="white"
//          border="2px solid #0000"
//          boxShadow={24}
//          p={4}
//          display="flex"
//          flexDirection="column"
//          gap={3}
//          sx = {{
//          transform : 'translate(-50%, -50%)',

//          }}
//         >
//           <Typography variant="h5">Add Item</Typography>
//           <Stack width="100%" direction="row" spacing={2}>
//             <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)} />
//             <Button 
//             variant="outlined" 
//             onClick={() => {
//               addItem(itemName)
//               setItemName('')
//               handleClose()
//             }} > Add </Button> 
//           </Stack>
//         </Box>

//       </Modal>
//       <Button 
//       variant="contained" 
//       onClick={() => {
//         handleOpen()
//       }} >Add New Item</Button>
//       <Box border="1px solid #333" >
//         <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
//           <Typography variant="h3" color="#333">
//             Stock Items
//           </Typography>
//         </Box>
//       <Stack width="800px" height="300px" spacing={2} overflow="auto">
//       {inventory.length > 0 ? (
//         inventory.map((item) => (
//           <Box key={item.id} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" padding={5} bgColor="#f0f0f0">
//             <Typography variant="h5" color="#333" textAlign="center" >{item.name?.charAt(0).toUpperCase()+item.name?.slice(1)}</Typography>
//             <Typography variant="h5" color="#333" textAlign="center" >{item.quantity}</Typography>
//             <Button variant="contained" onClick={() => removeItem(item)}>Remove</Button>
//           </Box>
//         ))
//       ) : (
//         <Typography>No items found</Typography>
//       )}
//       </Stack>
//       {/* {inventory.length > 0 ? (
//         inventory.map((item) => (
//           <Box key={item.id}>
//             <Typography variant="h6">{item.name}</Typography>
//             <Typography>Quantity: {item.quantity}</Typography>
//           </Box>
//         ))
//       ) : (
//         <Typography>No items found</Typography>
//       )} */}
//     </Box>
//     </Box>

//   );
// }
'use client';

import Image from "next/image";
import { firestore } from "../firebaseConfig.js";
import { Box, Button, Modal, Stack, TextField, Typography, Card, CardContent, CardActions, AppBar, Toolbar, IconButton, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    updateInventory();
  }, []);

  const addDocument = async () => {
    try {
      const docRef = doc(collection(firestore, 'stock'), 'test-doc');
      await setDoc(docRef, {
        name: 'Test Item',
        count: 100,
        description: 'This is a test item'
      });
      console.log('Document successfully written!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateInventory = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'stock'));
      const inventory = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Inventory data:', inventory);
      setInventory(inventory);
    } catch (e) {
      console.error('Error fetching inventory: ', e);
    }
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'stock'), item.id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { ...docSnap.data(), quantity: quantity - 1 });
        }
        await updateInventory();
      }
    } catch (e) {
      console.error('Error removing item: ', e);
    }
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'stock'), item);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { ...docSnap.data(), quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { name: item, quantity: 1 });
      }
      await updateInventory();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            stockBuddy
          </Typography>
          <Button color="inherit" onClick={handleOpen}>
            Add New Item
          </Button>
        </Toolbar>
      </AppBar>

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Typography variant="h5">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>Stock Items</Typography>
        <Stack spacing={2}>
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <Card key={item.id} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<RemoveIcon />}
                    onClick={() => removeItem(item)}
                    color="error"
                    variant="contained"
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography>No items found</Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
