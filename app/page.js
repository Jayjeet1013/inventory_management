"use client";

import { firestore } from "@/firebase";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        p: 3,
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Pantry Tracker
      </Typography>

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={isMobile ? "90%" : 400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)",
            borderRadius: "10px",
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: "bold" }}
          >
            Add item
          </Typography>
          <Stack
            width="100%"
            direction={isMobile ? "column" : "row"}
            spacing={2}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          mb: 2,
          transition: "background-color 0.3s",
          "&:hover": { backgroundColor: theme.palette.secondary.main },
        }}
      >
        Add New Item
      </Button>

      <TextField
        variant="outlined"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: isMobile ? "90%" : "400px", mb: 2 }}
      />

      <Box
        sx={{
          border: "1px solid #333",
          width: isMobile ? "90%" : "800px",
          bgcolor: "#e0f7fa",
          borderRadius: "10px",
          p: 2,
        }}
      >
        <Box
          sx={{
            height: "100px",
            bgcolor: "#80deea",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: "bold" }}
          >
            Pantry Items
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ overflow: "auto", maxHeight: "300px", p: 2 }}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#fff",
                p: 2,
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, background-color 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <Typography variant="h6">{name}</Typography>
              <Typography variant="h6">{quantity}</Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addItem(name)}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItem(name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Typography sx={{ mt: 3, textAlign: "center" }}>
        Made By Jayjeet Kumar
      </Typography>
    </Box>
  );
}
